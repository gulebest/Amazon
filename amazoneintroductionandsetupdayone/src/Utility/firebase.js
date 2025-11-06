// Utility/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

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

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Connect to emulators if running locally
if (window.location.hostname === "localhost") {
    // Firestore emulator
    connectFirestoreEmulator(db, "localhost", 8080);

    // Auth emulator
    connectAuthEmulator(auth, "http://localhost:9099");

    // Storage emulator
    connectStorageEmulator(storage, "localhost", 9199);
}