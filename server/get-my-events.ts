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

export const getMyEvents = async (email: string) => {
  const events: EventListType = [];
  const eventsRef = db.collection('events');
  const snapshot = await eventsRef.where('attendees', 'array-contains', email).get();
  snapshot.forEach((doc) => {
    events.push(doc.data() as EventType);
  });
  return events;
};
