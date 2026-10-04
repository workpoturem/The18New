import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '@/firebaseConfig.json';

export const firebase = {
  app: initializeApp(firebaseConfig),
  db: getFirestore(),
};
