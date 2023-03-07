// File: /src/config/firebaseconfig.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCj2t-NIFjJIHzvATG9hOezVUmj-fyvV0",
  authDomain: "headstarter-connect.firebaseapp.com",
  projectId: "headstarter-connect",
  storageBucket: "headstarter-connect.appspot.com",
  messagingSenderId: "518236808134",
  appId: "1:518236808134:web:ae666c1b86121c1bcb48c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export for use in React
export const auth = getAuth(app);
export const db = getFirestore(app);

