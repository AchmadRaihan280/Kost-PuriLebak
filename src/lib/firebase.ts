// src/lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZ8UvWM8yfkTHU9glNSClGz3-ye_KPikU",
  authDomain: "admin-puri-lebak.firebaseapp.com",
  projectId: "admin-puri-lebak",
  storageBucket: "admin-puri-lebak.firebasestorage.app",
  messagingSenderId: "522177233409",
  appId: "1:522177233409:web:0e0cadace03f513224f600",
  measurementId: "G-TXQBW0FH95",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
