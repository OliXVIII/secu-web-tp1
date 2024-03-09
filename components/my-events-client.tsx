'use client';

import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '@/config/firebaseConfig'; // Assuming this now exports auth

import { getMyEvents } from '@/server/get-my-events';
type MyEventsClientProps = {
  children: React.ReactNode;
};
export const MyEventsClient = ({ children }: MyEventsClientProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.email) {
      getMyEvents(currentUser.email).then((events) => {
        // set 'events' cookie to the user's events if they 'events' cookie doesn't exist and is not the same, then reload the page
        const eventsString = encodeURIComponent(JSON.stringify(events));
        const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
        const eventsCookie = cookies.find((cookie) => cookie.startsWith('events='));
        console.log('eventsCookie', eventsCookie);
        const eventsCookieValue = eventsCookie ? decodeURIComponent(eventsCookie.split('=')[1]) : null;
        console.log(eventsString, 'eventsCookieValue', eventsCookieValue);

        if (eventsString !== eventsCookieValue) {
          document.cookie = `events=${eventsString}; path=/`;
        }
      });
    }
  }, [currentUser]);

  return (
    <div className="pt-16 justify-center text-center">
      <h1>Mes événements</h1>
      {!currentUser && <p>Connectez-vous pour voir vos événements</p>}
      {children}
    </div>
  );
};
