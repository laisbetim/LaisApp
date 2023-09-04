// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3BGEUQAS4gc7yNjsq1ROLcaabQKPpqkc",
  authDomain: "laisapp-c88d9.firebaseapp.com",
  projectId: "laisapp-c88d9",
  storageBucket: "laisapp-c88d9.appspot.com",
  messagingSenderId: "923776752747",
  appId: "1:923776752747:web:2279ff746616f06e87a52e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const firebaseApp = initializeApp(firebaseConfig);