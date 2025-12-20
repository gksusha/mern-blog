// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-5eecc.firebaseapp.com",
  projectId: "mern-blog-5eecc",
  storageBucket: "mern-blog-5eecc.firebasestorage.app",
  messagingSenderId: "937246324564",
  appId: "1:937246324564:web:7b0ba99e242b653d7e3ac1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);