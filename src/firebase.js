// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAED_tnfQ3GhuSfgNiRjS2JvQcqksJy73k",
  authDomain: "netflixgpt-be034.firebaseapp.com",
  projectId: "netflixgpt-be034",
  storageBucket: "netflixgpt-be034.appspot.com",
  messagingSenderId: "790251741002",
  appId: "1:790251741002:web:d08360a16de995ebd96bb3",
  measurementId: "G-1BXZM8KTR5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
