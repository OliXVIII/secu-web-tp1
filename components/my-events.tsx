"use client";

import { EventListType } from "@/types/event";
import { useEffect, useState } from "react";

export const MyEvents = () => {
  const [events, setEvents] = useState<EventListType>([]);

  useEffect(() => {
    const eventsString = localStorage?.getItem("events");
    if (eventsString) {
      setEvents(JSON.parse(eventsString));
    }
  }, []);

  if (events.length === 0) {
    return;
  } else {
    return (
      <div>
        <h2 className="text-2xl text-center font-bold">Vos événements</h2>
        <ul className="flex ">
          {events.map((event) => (
            <li
              key={event.eventId}
              className="border-2 border-gray-200 p-4 m-4 rounded-md shadow-md"
            >
              <h3>{event.eventName}</h3>
              <p className="text-sm w-full text-end">{event.eventDate}</p>
              <p>Location: {event.location}</p>
              <p className="py-2">{event.description}</p>
              <ul className="grid grid-cols-4 gap-2">
                {Object.entries(event.zones).map(([zone, details]) => (
                  <li
                    key={zone}
                    className="border-2 border-gray-200 p-4 m-4 rounded-md shadow-md"
                  >
                    <h4 className="underline w-full text-center">{zone}</h4>
                    <p>Total seats: {details.totalSeats}</p>
                    <p>Available seats: {details.availableSeats}</p>
                    <p>Price: {details.pricePerTicket}$</p>
                  </li>
                ))}
              </ul>
              <a
                href={`/events/${event.eventId}`}
                className="text-blue-500 border border-blue-500 px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white"
              >
                Voir détails
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};
