'use client';

import { EventListType } from '@/types/event';
import { useEffect, useState } from 'react';

export const MyEvents = () => {
  const [events, setEvents] = useState<EventListType>([]);

  useEffect(() => {
    const eventsString = localStorage?.getItem('events');
    if (eventsString) {
      setEvents(JSON.parse(eventsString));
    }
  }, []);

  if (events.length === 0) {
    return;
  } else {
    return (
      <>
        <h2 className="text-2xl text-center font-bold">Vos événements</h2>
        <div className="flex flex-nowrap overflow-x-auto w-full scroll-smooth">
          {events.map((event) => (
            <div
              key={event.eventId}
              className="border-2 border-gray-200 p-4 m-4 rounded-md shadow-md w-96"
              style={{ flex: '0 0 auto' }}
            >
              <h3>{event.eventName}</h3>
              <p className="text-sm w-full text-end">{event.eventDate}</p>
              <p>Location: {event.location}</p>
              <p className="py-2">{event.description}</p>
              <ul className="sm:grid grid-cols-1 sm:gap-2">
                {Object.entries(event.zones).map(([zone, details]) => (
                  <li key={zone} className="border-2 border-gray-200 p-4 m-4 rounded-md shadow-md">
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
            </div>
          ))}
        </div>
      </>
    );
  }
};
