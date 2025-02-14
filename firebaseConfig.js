// Import required functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // If using Firebase Storage

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgoR-qlt87yORHsnOQUzxCZppXdFJjhxE",
    authDomain: "registration1-82ca6.firebaseapp.com",
    projectId: "registration1-82ca6",
    storageBucket: "registration1-82ca6.appspot.com",
    messagingSenderId: "166297726905",
    appId: "1:166297726905:android:2973de70e8d63d84a95068",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for React Native
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore & Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
