// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANAH_fWTFV5wG6sgA6jQGBK6JncE5c2tA",
  authDomain: "resume-app-c31bf.firebaseapp.com",
  projectId: "resume-app-c31bf",
  storageBucket: "resume-app-c31bf.appspot.com",
  messagingSenderId: "926100700040",
  appId: "1:926100700040:web:8d89c4f665bc8c043c583d",
  measurementId: "G-LXK5JNPT7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);