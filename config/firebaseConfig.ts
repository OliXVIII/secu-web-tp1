'use client';

import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBOWpUq-bWUS6fleYFpiz5raYITKocMPD4',
  authDomain: 'glo-3202-11082.firebaseapp.com',
  projectId: 'glo-3202-11082',
  storageBucket: 'glo-3202-11082.appspot.com',
  messagingSenderId: '762810083341',
  appId: '1:762810083341:web:6d00837405f0c7a5160d44',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);

export const userAuth = auth.currentUser;
