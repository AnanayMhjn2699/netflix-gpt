// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_-IK4mTRqol2qa5V-0jmJOEoKoCeKRsQ",
  authDomain: "netflix-gpt-60d5a.firebaseapp.com",
  projectId: "netflix-gpt-60d5a",
  storageBucket: "netflix-gpt-60d5a.appspot.com",
  messagingSenderId: "18560780659",
  appId: "1:18560780659:web:48a74a2c1af92f0d775d06",
  measurementId: "G-GB15GF63S6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
