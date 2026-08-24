"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CalendarEvent } from "@/lib/editorial";

const MSU_TYPES = ["Football", "Baseball", "Other MSU sports", "Campus tradition"];

const FILTERS = [
  { label: "All", test: () => true },
  { label: "MSU Football", test: (e: CalendarEvent) => e.eventType === "Football" },
  { label: "All MSU", test: (e: CalendarEvent) => MSU_TYPES.includes(e.eventType) },
  { label: "Arts", test: (e: CalendarEvent) => Boolean(e.categories?.includes("theater-and-arts")) },
] as const;

export default function EventsFilter({ events }: { events: CalendarEvent[] }) {
  const [active, setActive] = useState<(typeof FILTERS)[number]["label"]>("All");
  const activeFilter = FILTERS.find((f) => f.label === active) ?? FILTERS[0];
  const filtered = useMemo(() => events.filter(activeFilter.test), [events, activeFilter]);

  return (
    <>
      <div className="event-filters" role="tablist" aria-label="Filter events">
        {FILTERS.map((filter) => (
          <button
            key={filter.label}
            type="button"
            role="tab"
            aria-selected={active === filter.label}
            className={active === filter.label ? "event-filter-active" : ""}
            onClick={() => setActive(filter.label)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="event-filter-empty">No {active.toLowerCase()} events on the calendar right now.</p>
      ) : (
        filtered.map((event, index) => {
          const d = event.startsAt ? new Date(event.startsAt) : null;
          return (
            <article
              className={event.featured ? "event-row event-featured" : "event-row"}
              key={`${event.title}-${index}`}
            >
              <div className="event-date">
                {d ? (
                  <>
                    <strong>
                      {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        timeZone: "America/Chicago",
                      }).format(d)}
                    </strong>
                    <span>
                      {new Intl.DateTimeFormat("en-US", {
                        day: "2-digit",
                        timeZone: "America/Chicago",
                      }).format(d)}
                    </span>
                  </>
                ) : (
                  <small>
                    Date
                    <br />
                    pending
                  </small>
                )}
              </div>
              <div>
                <p className="eyebrow">{event.eventType}</p>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <span>
                  {event.location}
                  {event.dateLabel ? ` · ${event.dateLabel}` : ""}
                </span>
              </div>
              <Link href={`/events/${event.slug}`}>Event guide →</Link>
            </article>
          );
        })
      )}
    </>
  );
}
