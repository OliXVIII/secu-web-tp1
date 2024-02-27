import { getEventsList } from '@/server/get-events';
import { EventListType } from '@/types/event';
import { cookies } from 'next/headers';

export const EventsList = async () => {
  const events: EventListType = await getEventsList();
  return (
    <div>
      <h2 className="text-2xl text-center font-bold">Liste des événements</h2>
      <ul>
        {events.map((event) => {
          const cookie = cookies().get(event.eventName.replaceAll(' ', '-'));
          if (!cookie) {
            return (
              <li key={event.eventId} className="border-2 border-gray-200 p-4 m-4 rounded-md shadow-md @container/main">
                <h3>{event.eventName}</h3>
                <p className="text-sm w-full text-end">{event.eventDate}</p>
                <p>Location: {event.location}</p>
                <p className="py-2">{event.description}</p>
                <ul className="sm:grid grid-cols-1 sm:gap-2 @xs/main:grid-cols-2">
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
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
