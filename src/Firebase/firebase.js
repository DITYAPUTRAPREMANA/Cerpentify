// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1HQxx7cGIxWY4jMcV-wAJuaSpl5whEPc",
    authDomain: "cerpentify2.firebaseapp.com",
    projectId: "cerpentify2",
    storageBucket: "cerpentify2.firebasestorage.app",
    messagingSenderId: "656422803347",
    appId: "1:656422803347:web:5f483ad0c515ffb93dba66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };