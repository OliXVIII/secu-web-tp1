// - La gestion de formulaires ;
// • La validation de données ;
// • La sauvegarde de données (que ce soit dans un fichier ou dans une base de
// données);
// • Les cookies ;
// • Le localStorage.

import { getEvent } from '@/server/get-events';
import { EventType } from '@/types/event';
import { BuyTicket } from '@/components/buy-ticket';

const EventsPage = async ({ params }: { params: { events: string[] } }) => {
  const event: EventType | undefined = await getEvent(params.events[1]);
  if (!event) {
    return <h1>Événement non trouvé</h1>;
  } else {
    return (
      <div className="flex flex-col items-center justify-between p-24 max-sm:p-2 @container">
        <h1>{event.eventName}</h1>
        <p>{event.eventDate}</p>
        <p>{event.location}</p>
        <p>{event.description}</p>
        <ul className="grid grid-cols-1 gap-2 @container/md:grid-cols-1">
          {Object.entries(event.zones).map(([zone, details]) => (
            <li key={zone} className="border-2 border-gray-200 p-4 px-12 m-4 rounded-md shadow-md">
              <h4 className="underline w-full text-center">{zone}</h4>
              <p>Total seats: {details.totalSeats}</p>
              <p>Available seats: {details.availableSeats}</p>
              <p>Price: {details.pricePerTicket}$</p>
              <BuyTicket event={event} zone={zone} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default EventsPage;
