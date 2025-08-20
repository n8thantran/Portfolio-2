"use client";

import { BaseDock } from "../portfolio/components/BaseDock";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type ParkingData = {
  [key: string]: {
    total: number;
    open: number | null;
  };
};

const GARAGE_ADDRESSES: { [key: string]: string } = {
  "South Garage": "377 S. 7th St., San Jose, CA 95112",
  "West Garage": "350 S. 4th St., San Jose, CA 95112",
  "North Garage": "65 S. 10th St., San Jose, CA 95112",
  "South Campus Garage": "1278 S. 10th Street, San Jose, CA 95112",
};

const ParkingCard = ({
  name,
  open,
  total,
}: {
  name: string;
  open: number | null;
  total: number;
}) => {
  const openSpots = open ?? 0;
  const occupiedSpots = total - openSpots;
  const occupancyPercentage = total > 0 ? (occupiedSpots / total) * 100 : 0;
  const address = GARAGE_ADDRESSES[name];

  const getBarColor = () => {
    if (occupancyPercentage > 80) return "bg-red-500";
    if (occupancyPercentage > 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getOccupancyStatus = () => {
    if (occupancyPercentage > 90) return "Nearly Full";
    if (occupancyPercentage > 80) return "Very Full";
    if (occupancyPercentage > 60) return "Moderately Full";
    if (occupancyPercentage > 30) return "Available";
    return "Plenty of Space";
  };

  const handleOpenMaps = () => {
    if (!address) return;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const mapsUrl = isIOS
      ? `maps://maps.apple.com/?q=${encodeURIComponent(address)}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 w-full flex flex-col"
    >
      <div className="flex-grow">
        <h3 className="text-2xl font-light tracking-tight">{name}</h3>
        {open !== null ? (
          <>
            <div className="my-4">
              <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                {Math.round(occupancyPercentage)}%
                <span className="text-lg font-light text-gray-500 dark:text-gray-400 ml-2">
                  occupied
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {openSpots} of {total} spots available • {getOccupancyStatus()}
              </p>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 my-4">
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${getBarColor()}`}
                style={{ width: `${occupancyPercentage}%` }}
              ></div>
            </div>
          </>
        ) : (
          <p className="text-lg text-gray-500 dark:text-gray-400 my-4">
            Data not available
          </p>
        )}
      </div>

      {address && (
        <div className="mt-auto pt-4 text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400">{address}</p>
          <button
            onClick={handleOpenMaps}
            className="mt-2 w-full text-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-light"
          >
            Open in Maps
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default function ParkingPage() {
  const [data, setData] = useState<ParkingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/parking");
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error("Failed to fetch parking data", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-200">
      <BaseDock />
      <main className="flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-12">
        <div className="text-center max-w-4xl w-full">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-light tracking-tight mb-4"
          >
            SJSU Parking Status
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-12 font-light"
          >
            Real-time occupancy levels and availability for campus parking garages.
          </motion.p>
          
          {loading ? (
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 w-full animate-pulse">
                  <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="h-2.5 bg-gray-300 dark:bg-gray-700 rounded-full w-full"></div>
                </div>
              ))}
            </div>
          ) : data ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(data).map(([name, details]) => (
                <ParkingCard
                  key={name}
                  name={name}
                  open={details.open}
                  total={details.total}
                />
              ))}
            </div>
          ) : (
            <p>Could not load parking data. Please try again later.</p>
          )}
        </div>
      </main>
    </div>
  );
} 