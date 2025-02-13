import { TEvent } from "../../../types/event";

type Params = Promise<{ id: string }>;

async function fetchEvent(id: number): Promise<TEvent> {
  try {
    const response = await fetch(`https://api.hackthenorth.com/v3/events/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error("Event data could not be loaded.");
  }
}

// ✅ Correctly handling async params in Next.js 15+
export default async function EventPage({ params }: { params: Params }) {
  const resolvedParams = await params; // ✅ Await params since it's now a Promise
  const eventId = Number(resolvedParams.id);

  if (isNaN(eventId)) {
    throw new Error("Invalid event ID.");
  }

  const event = await fetchEvent(eventId);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{event.name}</h1>
      <p>{event.description}</p>
      <p>Type: {event.event_type}</p>
      <p>Start: {new Date(event.start_time).toLocaleString()}</p>
      <p>End: {new Date(event.end_time).toLocaleString()}</p>

      {event.speakers && event.speakers.length > 0 && (
        <div>
          <h3 className="font-semibold">Speakers:</h3>
          <ul>
            {event.speakers.map((speaker, index) => (
              <li key={index}>{speaker.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
