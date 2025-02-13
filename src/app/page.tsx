"use client";

import { useState, useEffect, useRef } from "react";
import type { TEvent } from "../types/event";
import { useRouter } from "next/navigation";
import { QuantumEventCard } from "./components/QuantumEventCard";
import { groupEventsByDay } from "../utils/eventUtils";
import { DateSelector } from "./components/DateSelector";
import Button from "./components/Button";
import { motion, useScroll, useSpring } from "framer-motion";
import ParallaxScroll from "./components/ParallaxScroll";
import Navbar from "./components/Navbar";
import { Card } from "pixel-retroui";

async function fetchEvents(): Promise<TEvent[]> {
  const response = await fetch("https://api.hackthenorth.com/v3/events");

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const events: TEvent[] = await response.json();
  return events.sort((a, b) => a.start_time - b.start_time);
}

export default function Home() {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return typeof window !== "undefined"
      ? localStorage.getItem("isLoggedIn") === "true"
      : false;
  });
  const [selectedDate, setSelectedDate] = useState("");
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    fetchEvents().then((fetchedEvents) => {
      setEvents(fetchedEvents);
      const eventDates = Object.keys(groupEventsByDay(fetchedEvents));
      setSelectedDate(eventDates[0]);
    });

    // Retrieve login state
    const savedLoginState = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(savedLoginState);
  }, []);

  const handleLoginToggle = () => {
    const newLoginState = !isLoggedIn;
    setIsLoggedIn(newLoginState);
    localStorage.setItem("isLoggedIn", newLoginState.toString());
    router.push(newLoginState ? "/login" : "/logout");
  };

  const eventsByDay = groupEventsByDay(
    events.filter((event) => event.permission !== "private" || isLoggedIn),
  );
  const dates = Object.keys(eventsByDay);

  return (
    
    <div className=" overflow-hidden h-screen">
      <Navbar />
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <ParallaxScroll />
      </div>
      <div className="flex justify-end p-4">
        <Button
          onClick={() => {
            // Keep button visible and delay the state change
            handleLoginToggle();
          }}
        >
          {isLoggedIn ? "Log Out" : "Log In"}
        </Button>
      </div>
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <header className="mb-6 mt-[-40px]">
            <div className="flex items-center justify-center">
              <h1 className="heading text-4xl md:text-6xl lg:text-7xl font-press-start-2p text-white relative shine neon-text gradient-outline">
                Hackathon Inc.
              </h1>
            </div>
          </header>

          {/* Main Content */}
          <main>
            <DateSelector
              dates={dates}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />

            {/* Event Section */}
            <div className="bg-gray-800/90 backdrop-blur-lg shadow-lg rounded-lg p-6 mb-8 relative border border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-blue-300">
                {selectedDate}
              </h2>
              <div
                ref={scrollContainerRef}
                className="space-y-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar"
              >
                {eventsByDay[selectedDate]?.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <QuantumEventCard event={event} />
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-rose-300"
                style={{ scaleX }}
              />
            </div>

            {/* Show login prompt only when user is NOT logged in */}
            {!isLoggedIn && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 bg-gray-800/80 backdrop-blur-lg border-l-4 border-rose-300 p-6 rounded-lg flex items-center shadow-md"
              >
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-rose-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
