import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import https from "https";

const TOTAL_SPOTS: { [key: string]: number } = {
  "South Garage": 1505,
  "West Garage": 1144,
  "North Garage": 1445,
  "South Campus Garage": 1480,
};

async function getParkingData() {
  const url = "https://sjsuparkingstatus.sjsu.edu/";
  try {
    // Node.js is stricter about self-signed certificates.
    // We create an agent to bypass SSL verification, similar to `verify=False` in Python.
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const { data: html } = await axios.get(url, {
      httpsAgent: agent,
    });

    const $ = cheerio.load(html);

    const data: { [key: string]: { total: number; open: number | null } } = {};
    $(".garage .garage__name").each((i, el) => {
      const garageName = $(el).text().trim();
      if (Object.keys(TOTAL_SPOTS).includes(garageName)) {
        const totalSpots = TOTAL_SPOTS[garageName];
        data[garageName] = { total: totalSpots, open: null };

        const nextP = $(el).next("p.garage__text");
        if (nextP.length > 0) {
          const fullnessSpan = nextP.find("span.garage__fullness");
          if (fullnessSpan.length > 0) {
            const percentageText = fullnessSpan.text().trim().replace("%", "").trim();
            const percentageFull = parseInt(percentageText, 10);

            if (!isNaN(percentageFull)) {
              const filledSpots = (percentageFull / 100) * totalSpots;
              const openSpots = totalSpots - filledSpots;
              data[garageName].open = Math.round(openSpots);
            }
          }
        }
      }
    });

    return data;
  } catch (error) {
    console.error("Error fetching or parsing parking data:", error);
    return null;
  }
}

export async function GET() {
  const parkingData = await getParkingData();
  if (parkingData === null) {
    return NextResponse.json(
      { error: "Could not retrieve parking data." },
      { status: 500 }
    );
  }
  return NextResponse.json(parkingData);
} 