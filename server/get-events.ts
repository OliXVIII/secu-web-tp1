"use server";

import { EventListType, EventType } from "@/types/event";

var admin = require("firebase-admin");

var serviceAccount = require("../config/glo-3202-11082-firebase-adminsdk-j10eb-9f66058cd4.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

//import event from firestore

const eventsCached: EventListType = [];

export const getEventsList = async () => {
  console.log("getEventsList");
  if (eventsCached.length === 0) {
    const events = await db.collection("events").get();
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
  console.log("addEvent", event);

  const docRef = db.collection("events").doc(event.eventId);
  await docRef.set(event);
};

export const saveUserRegistration = async (
  event: EventType,
  user: { email: string; password: string },
  zone: string
) => {
  const docRef = db.collection("events").doc(event.eventId);
  const eventDoc = await docRef.get();
  const attendees = eventDoc.data().attendees ?? [];
  if (!eventDoc.exists) {
    console.log("No such document!");
    return "Événement non trouvé!";
  } else if (eventDoc.data().zones[zone].availableSeats === 0) {
    console.log("No available seats!");
    return "Pas de places disponibles!";
  } else if (attendees.find((attendee: any) => attendee.email === user.email)) {
    console.log("User already registered!");
    return "Billet déjà réservé!";
  }

  if (zone === "ZIP") {
    await docRef.update({
      zones: {
        ZIP: {
          availableSeats: event.zones.ZIP.availableSeats - 1,
          pricePerTicket: event.zones.ZIP.pricePerTicket,
          totalSeats: event.zones.ZIP.totalSeats,
        },
        GA_ADMISSION: {
          availableSeats: event.zones.GA_ADMISSION.availableSeats,
          pricePerTicket: event.zones.GA_ADMISSION.pricePerTicket,
          totalSeats: event.zones.GA_ADMISSION.totalSeats,
        },
      },
    });
  } else if (zone === "GA_ADMISSION") {
    await docRef.update({
      zones: {
        ZIP: {
          availableSeats: event.zones.ZIP.availableSeats,
          pricePerTicket: event.zones.ZIP.pricePerTicket,
          totalSeats: event.zones.ZIP.totalSeats,
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
    attendees: attendees.concat(user),
  });
  return "Billet réservé!";
};
