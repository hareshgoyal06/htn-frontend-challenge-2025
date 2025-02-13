import type { TEvent } from "../types/event"

export function groupEventsByDay(events: TEvent[]): Record<string, TEvent[]> {
  return events.reduce(
    (acc, event) => {
      const date = new Date(event.start_time).toLocaleDateString("en-US", { month: "long", day: "numeric" })
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(event)
      return acc
    },
    {} as Record<string, TEvent[]>,
  )
}

