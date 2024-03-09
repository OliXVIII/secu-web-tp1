import { getEventsList } from '@/server/get-events';
import { EventListType } from '@/types/event';
import { set } from 'firebase/database';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { Cancel } from './cancel';

type EventListProps = {
  isMyEvent?: boolean;
};

export const EventsList = async ({ isMyEvent }: EventListProps) => {
  let events = [] as EventListType;
  if (!isMyEvent) {
    events = await getEventsList();
  } else {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('Resolved after 2 seconds');
      }, 1000);
    });
    const eventsCookie = cookies().get('events');
    if (eventsCookie?.value) events = JSON.parse(eventsCookie.value);
  }
  return (
    <div>
      {!isMyEvent && <h2 className="text-2xl text-center font-bold">Liste des événements</h2>}
      <ul>
        {events.map((event, i) => {
          const cookie = cookies().get(event.eventId.replaceAll(' ', '-'));
          if (!cookie || (isMyEvent && cookie.value === 'true')) {
            return (
              <li
                key={event.eventId + ' i'}
                className="border-2 border-gray-200 p-4 m-4 my-10 rounded-md shadow-md @container/main"
              >
                <a href={`/events/${event.eventId}`} className="cursor-pointer">
                  <Image
                    src={
                      'https://www.quebec-cite.com/sites/otq/files/styles/gallery_desktop/public/media/image/Festival_ete_quebec.jpg?itok=EFf_R7-l'
                    }
                    alt={event.eventName}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-md shadow-md"
                  />
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
                  <div className="text-blue-500 border border-blue-500 px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white w-28">
                    Voir détails
                  </div>
                </a>
                {isMyEvent && <Cancel eventId={event.eventId} />}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
