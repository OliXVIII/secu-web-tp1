'use client';

import { auth } from '@/config/firebaseConfig';
import { ModifyPassword } from '@/server/modify-password';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const submiteNewPassword = () => {
    const newPasswordInput = document.querySelector('input[type="password"]');
    if (!newPasswordInput || !currentUser) {
      return;
    }
    const newPassword = (newPasswordInput as HTMLInputElement).value;
    ModifyPassword({ previousPassword: '', newPassword, user: currentUser });
  };

  return (
    <div className="pt-16 justify-center text-center">
      <h1>Profile</h1>
      <p>Modifier mot de passe sécuritairement pour {currentUser?.displayName}</p>
      <input type="password" placeholder="Nouveau mot de passe" className="border border-gray-200 p-1 mt-2 rounded-md" />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 ml-4 rounded mt-5 w-40 mx-auto"
        onClick={submiteNewPassword}
      >
        Connecter
      </button>
    </div>
  );
};

export default ProfilePage;
