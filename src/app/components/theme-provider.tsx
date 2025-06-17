"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("ThemeProvider mounting...");
    try {
      // Check for saved theme preference or default to system preference
      const savedTheme = localStorage.getItem("theme") as Theme;
      console.log("Saved theme from localStorage:", savedTheme);
      
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
        setTheme(savedTheme);
        console.log("Setting theme from localStorage:", savedTheme);
      } else if (typeof window !== "undefined") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        setTheme(systemTheme);
        console.log("Setting theme from system preference:", systemTheme);
      }
    } catch (error) {
      console.warn("Failed to access localStorage or matchMedia", error);
    }
    
    setMounted(true);
    console.log("ThemeProvider mounted");
  }, []);

  useEffect(() => {
    if (!mounted || typeof document === "undefined") return;
    
    console.log("Applying theme to document:", theme);
    try {
      // Apply theme to document
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      console.log("Document classes after theme application:", root.className);
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.warn("Failed to apply theme", error);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    console.log("Toggling theme from", theme, "to", newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
} 