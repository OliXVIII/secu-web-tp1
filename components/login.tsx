'use client';
import { useRef } from 'react';
import { auth } from '../config/firebaseConfig'; // Adjust the path based on where your firebaseConfig file is located
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export const Login = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const login = async () => {
    const emailElement = document.querySelector('input[type="email"]');
    const passwordElement = document.querySelector('input[type="password"]');

    if (typeof window === 'undefined') {
      throw new Error('You must import this file in a client-side code');
    }

    if (
      emailElement &&
      passwordElement &&
      emailElement instanceof HTMLInputElement &&
      passwordElement instanceof HTMLInputElement
    ) {
      const email = emailElement.value;
      const password = passwordElement.value;

      try {
        // Try signing in the user
        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(`Utilisateur connecté:`, userCredential.user);
          })
          .catch((error) => {
            console.error('Authentication failed:', error.code, error.message);
          });
        localStorage.setItem('isUserLoggedIn', 'true');
        dialogRef.current?.close();
      } catch (error: any) {
        console.error('Authentication failed:', error.code, error.message);

        // Handle sign-in errors
        if (error.code === 'auth/invalid-email') {
          alert('Invalid email address format.');
        } else if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
          try {
            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
              console.log('User created:', userCredential.user);
            });
            localStorage.setItem('isUserLoggedIn', 'true');
          } catch (creationError: any) {
            console.error('User creation failed:', creationError.code, creationError.message);

            // Handle user creation errors without giving specific details about the error
            if (creationError.code === 'auth/weak-password') {
              alert('Le mot de passe doit contenir au moins 6 caractères.');
            } else {
              alert('Une erreur est survenue, veuillez réessayer.');
            }
          }
        } else if (error.code === 'auth/too-many-requests') {
          alert('Trois tentatives de connexion infructueuses. Veuillez réessayer plus tard.');
        } else {
          alert('Une erreur est survenue, veuillez réessayer.');
        }
      }
    }
  };

  return (
    <dialog ref={dialogRef} id="dialog" open={false} className="w-90 rounded-md">
      <div className="flex flex-col p-16 bg-white shadow-md">
        <p>Email</p>
        <input type="email" className="border border-gray-200 p-1 rounded-md" />
        <p>Password</p>
        <input type="password" className="border border-gray-200 p-1 rounded-md" />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 w-40 mx-auto"
          onClick={login}
        >
          Connecter
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-5 w-40 mx-auto"
          onClick={() => dialogRef.current?.close()}
        >
          Annuler
        </button>
      </div>
    </dialog>
  );
};
