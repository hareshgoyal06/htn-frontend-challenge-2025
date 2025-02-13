"use client";
import { useState } from "react";
import type { TEvent } from "../../types/event";
import { ClockIcon, UserIcon, LinkIcon, XIcon } from "lucide-react";
import { Card } from "pixel-retroui";
import { motion, AnimatePresence } from "framer-motion";

// Function to format event type labels consistently
function formatEventType(eventType: string) {
  const formattedTypes: { [key: string]: string } = {
    tech_talk: "Tech Talk",
    activity: "Activity",
    workshop: "Workshop",
  };

  return formattedTypes[eventType] || eventType.charAt(0).toUpperCase() + eventType.slice(1);
}

export function EventCard({ event }: { event: TEvent }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Event Card */}
      <Card className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-500 hover:border-blue-400 transform hover:-translate-y-1 p-4 flex flex-col justify-between w-full h-auto">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-blue-300">{event.name}</h3>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-500 text-purple-100">
              {formatEventType(event.event_type)}
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-3 line-clamp-3">
            {event.description}
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-blue-400">
            <ClockIcon className="h-4 w-4 mr-2" />
            <span>{`${new Date(event.start_time).toLocaleDateString()} ${new Date(event.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })} - ${new Date(event.end_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}`}</span>
          </div>
          {event.speakers.length > 0 && (
            <div className="flex items-center text-green-400">
              <UserIcon className="h-4 w-4 mr-2" />
              <span>
                {event.speakers.map((speaker: { name: string }) => speaker.name).join(", ")}
              </span>
            </div>
          )}
          {(event.public_url || event.private_url) && (
            <div className="flex items-center text-pink-400">
              <LinkIcon className="h-4 w-4 mr-2" />
              <a
                href={event.public_url || event.private_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Event Link
              </a>
            </div>
          )}
        </div>
        <div className="bg-gray-700 px-4 py-2 mt-4 rounded-b-lg text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-blue-300 hover:text-blue-200 transition-colors duration-200"
          >
            View Details →
          </button>
        </div>
      </Card>

      {/* Event Details Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            {/* Modal Content */}
            <motion.div
              className="bg-gray-800 rounded-lg border border-blue-500 shadow-xl p-6 w-full max-w-lg relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition-all"
              >
                <XIcon className="h-5 w-5" />
              </button>

              {/* Modal Header */}
              <h2 className="text-xl font-semibold text-blue-300 mb-2">{event.name}</h2>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-500 text-purple-100">
                {formatEventType(event.event_type)}
              </span>

              {/* Description */}
              <p className="text-gray-400 text-sm mt-3">{event.description}</p>

              {/* Event Details */}
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center text-blue-400">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  <span>{`${new Date(event.start_time).toLocaleDateString()} ${new Date(event.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })} - ${new Date(event.end_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}`}</span>
                </div>
                {event.speakers.length > 0 && (
                  <div className="flex items-center text-green-400">
                    <UserIcon className="h-4 w-4 mr-2" />
                    <span>
                      {event.speakers.map((speaker: { name: string }) => speaker.name).join(", ")}
                    </span>
                  </div>
                )}
                {(event.public_url || event.private_url) && (
                  <div className="flex items-center text-pink-400">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    <a
                      href={event.public_url || event.private_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Event Link
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
