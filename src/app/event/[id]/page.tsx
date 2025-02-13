import { TEvent } from "../../../types/event";

// Fetch a single event by ID
async function fetchEvent(id: number): Promise<TEvent> {
  const response = await fetch(`https://api.hackthenorth.com/v3/events/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }

  return response.json();
}

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await fetchEvent(parseInt(params.id));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{event.name}</h1>
      <p>{event.description}</p>
      <p>Type: {event.event_type}</p>
      <p>Start: {new Date(event.start_time).toLocaleString()}</p>
      <p>End: {new Date(event.end_time).toLocaleString()}</p>
      {event.speakers.length > 0 && (
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
