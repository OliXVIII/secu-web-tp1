'use server';
import admin from 'firebase-admin';
import { doc } from 'firebase/firestore';
import { cookies } from 'next/headers';

export const cancelEvent = async ({ email, eventId }: { email?: string; eventId: string }) => {
  if (!email) {
    return;
  }

  if (!admin.apps.length) {
    const serviceAccount = require('../config/glo-3202-11082-firebase-adminsdk-j10eb-9f66058cd4.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  const db = admin.firestore();
  const docRef = db.collection('events').doc(eventId);
  const eventDoc = await docRef.get();
  const event = eventDoc.data() as any;
  docRef.update({
    attendees: admin.firestore.FieldValue.arrayRemove(email),
  });

  if (event.zones.GA_ADMISSION && event.zones.VIP) {
    docRef.update({
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

  cookies().delete(eventId);
  const events = cookies().get('events');
  if (events) {
    const eventsArray = JSON.parse(events.value);
    const index = eventsArray.findIndex((event: any) => event.eventId === eventId);
    eventsArray.splice(index, 1);
    cookies().set('events', JSON.stringify(eventsArray));
  }
};
