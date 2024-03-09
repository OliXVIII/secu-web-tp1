'use client';

import { auth } from '@/config/firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { cancelEvent } from '@/server/cancel';

export const Cancel = ({ eventId }: { eventId: string }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const cancetAction = async () => {
    if (!currentUser) {
      return;
    }
    await cancelEvent({ email: currentUser?.email ?? '', eventId });
    //delete id cookie
    const localStorageEvents = localStorage.getItem('events');
    if (localStorageEvents) {
      const events = JSON.parse(localStorageEvents);
      const index = events.findIndex((event: any) => event.eventId === eventId);
      events.splice(index, 1);
      localStorage.setItem('events', JSON.stringify(events));
    }
  };

  return (
    <button
      className="text-red-500 border border-red-500 px-2 py-1 rounded-md hover:bg-red-500 hover:text-white w-40"
      onClick={() => cancetAction()}
    >
      Soumettre un remboursement
    </button>
  );
};
