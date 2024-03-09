'use client';

import { useEffect, useRef, useState } from 'react';
import { saveUserRegistration } from '@/server/get-events';
import { EventType } from '@/types/event';
import Cookie from 'js-cookie';
import { auth } from '@/config/firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';

type BuyTicketProps = {
  event: EventType;
  zone: string;
};

export const BuyTicket = ({ event, zone }: BuyTicketProps) => {
  const [message, setMessage] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [hideBuyButton, setHideBuyButton] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const buyTicket = async () => {
    if (!currentUser) {
      const dialog: HTMLDialogElement | null = document.getElementById('dialog') as HTMLDialogElement | null;
      if (!dialog) {
        return;
      }
      dialog.showModal();
      document.addEventListener('click', (e) => {
        if (e.target === dialog) {
          dialog.close();
        }
      });
      return;
    } else {
      if (currentUser?.email !== null) {
        const response: string = await saveUserRegistration(event, currentUser?.email, zone);

        if (response === 'Billet réservé!') {
          const events = JSON.parse(localStorage.getItem('events') ?? '[]');
          events.push(event);
          localStorage.setItem('events', JSON.stringify(events));
        }
        setMessage(response);

        if (response === 'Billet réservé!' || response === 'Billet déjà réservé!') {
          setHideBuyButton(true);
          Cookie.set(event.eventId, 'true');
        } else if (response === 'Pas de places disponibles!') {
          alert('Pas de places disponibles!');
        }
        dialogRef.current?.showModal();
        setTimeout(() => {
          dialogRef.current?.close();
        }, 1500);
      }
    }
  };

  if (hideBuyButton) {
    return <p className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Billet déjà réservé</p>;
  }

  return (
    <>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={buyTicket}>
        Réserver un billet
      </button>
      <dialog ref={dialogRef} open={false} className="fixed inset-0 z-10 rounded-md">
        <div className="flex flex-col p-5 w-60 bg-white rounded-md shadow-md">
          <p>{message}</p>
        </div>
      </dialog>
    </>
  );
};
