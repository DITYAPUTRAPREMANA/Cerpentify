// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASnVKcPgQuzTG8xUTHyZWM4MC4sz1d0uE",
  authDomain: "cerpentify-web.firebaseapp.com",
  projectId: "cerpentify-web",
  storageBucket: "cerpentify-web.firebasestorage.app",
  messagingSenderId: "497939114231",
  appId: "1:497939114231:web:bb888ab317cee186720bf2",
  measurementId: "G-NK3NFE7S5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);