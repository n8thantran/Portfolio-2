"use client";

import { BaseDock } from "../portfolio/components/BaseDock";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LocationData {
  LocationId: number;
  LocationName: string;
  TotalCapacity: number;
  CountOfParticipants: number;
  PercetageCapacity: number;
  LastUpdatedDateAndTime: string;
  LastCount: number;
  MinColor: string;
  MidColor: string | null;
  MaxColor: string;
  MinCapacityRange: number;
  MaxCapacityRange: number;
  CountCapacityColorEnabled: boolean;
  FacilityId: number;
  FacilityName: string;
  IsClosed: boolean;
}

const FacilityCard = ({ location }: { location: LocationData }) => {
  const { LocationName, LastCount, TotalCapacity, LastUpdatedDateAndTime, IsClosed } = location;
  const currentCount = LastCount || 0; // Use LastCount instead of CountOfParticipants
  const occupancy = TotalCapacity > 0 ? (currentCount / TotalCapacity) * 100 : 0;
  const availableSpots = TotalCapacity - currentCount;

  const getBarColor = () => {
    if (IsClosed) return "bg-gray-500";
    if (occupancy < 50) return "bg-green-500";
    if (occupancy < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusColor = () => {
    if (IsClosed) return "text-gray-500";
    if (occupancy < 50) return "text-green-600 dark:text-green-400";
    if (occupancy < 80) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    } catch {
      return "Unknown";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 w-full flex flex-col"
    >
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-light tracking-tight">{LocationName}</h3>
          {IsClosed && (
            <span className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
              CLOSED
            </span>
          )}
        </div>
        
        {IsClosed ? (
          <p className="text-lg text-gray-500 dark:text-gray-400 my-4">
            Facility is currently closed
          </p>
        ) : (
          <>
            <p className={`text-4xl font-bold my-2 ${getStatusColor()}`}>
              {currentCount}
              <span className="text-lg font-light text-gray-500 dark:text-gray-400">
                / {TotalCapacity} people
              </span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {availableSpots} spots available ({occupancy.toFixed(1)}% full)
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 my-4">
              <div
                className={`h-2.5 rounded-full ${getBarColor()}`}
                style={{ width: `${Math.min(occupancy, 100)}%` }}
              ></div>
            </div>
          </>
        )}
      </div>

      <div className="mt-auto pt-4 text-left">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {formatTime(LastUpdatedDateAndTime)}
        </p>
      </div>
    </motion.div>
  );
};

export default function SRACPage() {
  const [data, setData] = useState<LocationData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/srac");
        const jsonData = await res.json();
        
        if (Array.isArray(jsonData)) {
          setData(jsonData);
          setLastUpdated(new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          }));
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Failed to fetch SRAC data", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    
    // Refresh data every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Categorize facilities
  const gymAreas = data?.filter(location => 
    location.LocationName.includes("Gym") || 
    location.LocationName.includes("Court")
  ) || [];
  
  const fitnessFloors = data?.filter(location => 
    location.LocationName.includes("Fit Floor")
  ) || [];
  
  const pools = data?.filter(location => 
    location.LocationName.includes("Pool")
  ) || [];
  
  const other = data?.filter(location => 
    !location.LocationName.includes("Gym") && 
    !location.LocationName.includes("Court") &&
    !location.LocationName.includes("Fit Floor") &&
    !location.LocationName.includes("Pool")
  ) || [];

  const renderSection = (title: string, facilities: LocationData[]) => {
    if (facilities.length === 0) return null;
    
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-light mb-4 text-gray-800 dark:text-gray-200">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((location) => (
            <FacilityCard key={location.LocationId} location={location} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-200">
      <BaseDock />
      <main className="flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-12">
        <div className="text-center max-w-6xl w-full">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-light tracking-tight mb-4"
          >
            SRAC Facility Monitor
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8 font-light"
          >
            Live capacity tracking for SJSU Recreation & Aquatic Center facilities.
          </motion.p>
          
          {lastUpdated && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm text-gray-500 dark:text-gray-500 mb-12"
            >
              Data refreshed at {lastUpdated}
            </motion.p>
          )}
          
          {loading ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 w-full animate-pulse">
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                    <div className="h-2.5 bg-gray-300 dark:bg-gray-700 rounded-full w-full mb-4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : data ? (
            <div className="space-y-8">
              {renderSection("Gyms & Courts", gymAreas)}
              {renderSection("Fitness Floors", fitnessFloors)}
              {renderSection("Pools", pools)}
              {renderSection("Other Facilities", other)}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Could not load SRAC facility data. Please try again later.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-light"
              >
                Retry
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
} 