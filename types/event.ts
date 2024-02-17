export type EventType = {
  eventId: string;
  eventName: string;
  eventDate: string;
  location: string;
  description: string;
  thumbnailUrl?: string;
  zones: {
    [zone: string]: {
      totalSeats: number;
      availableSeats: number;
      pricePerTicket: number;
    };
  };
};
export type EventListType = EventType[];

export type ZoneType = {
  totalSeats: number;
  availableSeats: number;
  pricePerTicket: number;
};
