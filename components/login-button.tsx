'use client';
import { auth } from '@/config/firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const LoginButton = () => {
  const [userLogin, setUserLogin] = useState<boolean>(false);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserLogin(!!user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (userLogin) {
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          signOut(auth)
            .then(() => {
              alert('Vous êtes déconnecté');
            })
            .catch((error) => {
              alert('Une erreur est survenue');
            });
        }}
      >
        Deconnexion
      </button>
    );
  } else {
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          const dialog: HTMLDialogElement | null = document.getElementById('dialog') as HTMLDialogElement | null;
          if (dialog) {
            dialog.showModal();
          }
        }}
      >
        Connecter
      </button>
    );
  }
};
