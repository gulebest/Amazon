// Utility/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyB9Ahj-WhMujZqjG_3ShXwothK3yUJ-ySo",
    authDomain: "clone-3e733.firebaseapp.com",
    projectId: "clone-3e733",
    storageBucket: "clone-3e733.firebasestorage.app",
    messagingSenderId: "100426441330",
    appId: "1:100426441330:web:f18d71654ea8dc9aa698eb",
    measurementId: "G-V94TSSR8BR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services you need
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);