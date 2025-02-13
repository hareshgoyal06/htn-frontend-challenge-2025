"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import type { TEvent, TEventType, TPermission } from "../types/event";
import { EventCard } from "./components/EventCard";
import { groupEventsByDay } from "../utils/eventUtils";
import { motion, useScroll, useSpring } from "framer-motion";
import ParallaxScroll from "./components/ParallaxScroll";
import Navbar from "./components/Navbar";
import LoginButton from "./components/LoginButton";
import FilterSortComponent from "./components/FilterSortComponent";

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
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState<TEventType | null>(null);
  const [sortCriteria, setSortCriteria] = useState<string | null>(null);
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
  }, []);

  const allEvents = useMemo(() => events, [events]);

  const filteredAndSortedEvents = useMemo(() => {
    let filteredEvents = allEvents.filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    if (filterCriteria) {
      filteredEvents = filteredEvents.filter(
        (event) => event.event_type === filterCriteria,
      );
    }
    if (sortCriteria === "date") {
      filteredEvents.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    } else if (sortCriteria === "name") {
      filteredEvents.sort((a, b) => a.name.localeCompare(b.name));
    }
    return filteredEvents;
  }, [searchQuery, filterCriteria, sortCriteria, allEvents]);

  return (
    <div className="overflow-hidden h-screen">
      <Navbar />
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <ParallaxScroll />
      </div>
      <LoginButton />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-6 mt-12">
            <div className="flex items-center justify-center w-full">
              <h1 className="heading text-4xl md:text-6xl lg:text-7xl font-press-start-2p text-white relative shine neon-text gradient-outline">
                Hackathon Inc.
              </h1>
            </div>
          </header>

          <main className="space-y-3">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded-lg bg-gray-900 text-white border-gray-600"
            />

            <FilterSortComponent
              onFilterChange={setFilterCriteria}
              onSortChange={setSortCriteria}
            />

            <div className="bg-gray-800/90 backdrop-blur-lg shadow-lg rounded-lg p-4 relative border border-gray-700">
              <h2 className="text-lg font-bold mb-2 text-blue-300 text-center">
                Events
              </h2>
              <div
                ref={scrollContainerRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar"
              >
                {filteredAndSortedEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1.5 bg-rose-300"
                style={{ scaleX }}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
