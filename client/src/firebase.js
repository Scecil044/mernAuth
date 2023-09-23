// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-beeb5.firebaseapp.com",
  projectId: "mern-auth-beeb5",
  storageBucket: "mern-auth-beeb5.appspot.com",
  messagingSenderId: "665658554349",
  appId: "1:665658554349:web:fd318c9f219603c64499e4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
