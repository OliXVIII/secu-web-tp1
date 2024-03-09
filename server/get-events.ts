'use server';

import { EventListType, EventType } from '@/types/event';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccount = require('../config/glo-3202-11082-firebase-adminsdk-j10eb-9f66058cd4.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

//import event from firestore

const eventsCached: EventListType = [];

export const getEventsList = async () => {
  if (eventsCached.length === 0) {
    const eventsRef = await db.collection('events');
    const events = await eventsRef?.get();
    events.forEach((eventData: any) => {
      const event = eventData.data();
      delete event.attendees;
      eventsCached.push(event);
    });
  }
  return eventsCached;
};

export const getEvent = async (eventId: string) => {
  if (eventsCached.length === 0) {
    await getEventsList();
  }
  return eventsCached.find((event) => event.eventId === eventId);
};

export const addEvent = async (event: EventType) => {
  console.log('addEvent', event);

  const docRef = db.collection('events').doc(event.eventId);
  await docRef.set(event);
};

export const saveUserRegistration = async (event: EventType, email: string, zone: string) => {
  try {
    const docRef = db.collection('events').doc(event.eventId);
    const eventDoc = await docRef.get();
    const attendees = eventDoc.data()?.attendees ?? [];
    const data = eventDoc.data();

    console.log('eventDoc', attendees);

    if (!data) {
      console.log('No such document!');
      return 'Événement non trouvé!';
    } else if (eventDoc.data()?.zones[zone].availableSeats === 0) {
      console.log('No available seats!');
      return 'Pas de places disponibles!';
    } else if (attendees.find((attendee: any) => attendee === email)) {
      console.log('User already registered!');
      return 'Billet déjà réservé!';
    }

    if (zone === 'VIP') {
      await docRef.update({
        zones: {
          VIP: {
            availableSeats: data.zones.VIP.availableSeats - 1,
            pricePerTicket: data.zones.VIP.pricePerTicket,
            totalSeats: data.zones.VIP.totalSeats,
          },
          GA_ADMISSION: {
            availableSeats: data.zones.GA_ADMISSION.availableSeats,
            pricePerTicket: data.zones.GA_ADMISSION.pricePerTicket,
            totalSeats: data.zones.GA_ADMISSION.totalSeats,
          },
        },
      });
    } else if (zone === 'GA_ADMISSION') {
      await docRef.update({
        zones: {
          VIP: {
            availableSeats: event.zones.VIP.availableSeats,
            pricePerTicket: event.zones.VIP.pricePerTicket,
            totalSeats: event.zones.VIP.totalSeats,
          },
          GA_ADMISSION: {
            availableSeats: event.zones.GA_ADMISSION.availableSeats - 1,
            pricePerTicket: event.zones.GA_ADMISSION.pricePerTicket,
            totalSeats: event.zones.GA_ADMISSION.totalSeats,
          },
        },
      });
    }
    await docRef.update({
      attendees: attendees.concat(email),
    });
    return 'Billet réservé!';
  } catch (error) {
    console.error('Error adding document: ', error);
    return 'Erreur lors de la réservation!';
  }
};
