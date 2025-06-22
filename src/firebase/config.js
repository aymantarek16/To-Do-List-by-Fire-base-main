// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuh, createUserWithEmailAndPasswor, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC86NBlKDB0Vs1FYyZFy3TsBvSEEMugJoM",
  authDomain: "react-level2-19516.firebaseapp.com",
  projectId: "react-level2-19516",
  storageBucket: "react-level2-19516.appspot.com",
  messagingSenderId: "127124913660",
  appId: "1:127124913660:web:669dde287101d739fd4679"
};

// Initialize Firebadse
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
