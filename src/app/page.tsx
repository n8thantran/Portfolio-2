"use client";

import React from "react";
import Link from "next/link";
import { HomeDock } from "./portfolio/components/HomeDock";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-200">
      <HomeDock />
      <main className="flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
            Nathan Tran
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 font-light leading-relaxed">
            Computer Science @ SJSU
          </p>
          
          <Link href="/portfolio">
            <button className="group relative px-8 py-3 border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-light tracking-wide">
              <span className="relative z-10">View Portfolio</span>
              <div className="absolute inset-0 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
