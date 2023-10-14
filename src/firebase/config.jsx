// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import {getMessaging } from "firebase/messaging"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDnpNDu2bgT553XvYMntx5B0HD3fKzyD0A',
  authDomain: 'reuse-f0081.firebaseapp.com',
  projectId: 'reuse-f0081',
  storageBucket: 'reuse-f0081.appspot.com',
  messagingSenderId: '51604544208',
  appId: '1:51604544208:web:a0dad3a15c405bb4221cd5',
  measurementId: 'G-Q3TLHLZN75'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export const messaging = getMessaging(app);

//set up firebase messaging

