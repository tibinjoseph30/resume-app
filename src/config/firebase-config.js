// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNkLxotFQwdb5sC3u3UlsUpY5iaP5Y64w",
  authDomain: "resume-app-3340e.firebaseapp.com",
  projectId: "resume-app-3340e",
  storageBucket: "resume-app-3340e.appspot.com",
  messagingSenderId: "211605430292",
  appId: "1:211605430292:web:9ce18041abff5801bf4701",
  measurementId: "G-GXR7DE7F9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)