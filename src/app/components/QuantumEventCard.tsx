"use client";
import type { TEvent } from "../../types/event";
import { ClockIcon, UserIcon, LinkIcon } from "lucide-react";

export function QuantumEventCard({ event }: { event: TEvent }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-500 hover:border-blue-400 transform hover:-translate-y-1">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-blue-300">{event.name}</h3>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-500 text-purple-100">
            {event.event_type}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-3">{event.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-blue-400">
            <ClockIcon className="h-4 w-4 mr-2" />
            <span>{`${new Date(event.start_time).toLocaleTimeString()} - ${new Date(event.end_time).toLocaleTimeString()}`}</span>
          </div>
          {event.speakers.length > 0 && (
            <div className="flex items-center text-green-400">
              <UserIcon className="h-4 w-4 mr-2" />
              <span>
                {event.speakers
                  .map((speaker: { name: any }) => speaker.name)
                  .join(", ")}
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
      </div>
      <div className="bg-gray-700 px-4 py-2">
        <a
          href={`/event/${event.id}`}
          className="text-sm text-blue-300 hover:text-blue-200 transition-colors duration-200"
        >
          View Details →
        </a>
      </div>
    </div>
  );
}
