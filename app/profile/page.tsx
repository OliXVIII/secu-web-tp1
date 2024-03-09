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
      {!currentUser ? <p>Connectez-vous pour voir votre profile</p> : <p>Bonjour {currentUser?.email}</p>}
    </div>
  );
};

export default ProfilePage;
