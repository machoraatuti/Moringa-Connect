import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyCob1d2UNIU11vftfkXz6qwCbq60goe-8s",
    authDomain: "moringaconnectdb.firebaseapp.com",
    projectId: "moringaconnectdb",
    storageBucket: "moringaconnectdb.firebasestorage.app",
    messagingSenderId: "1037558167584",
    appId: "1:1037558167584:web:3ab2debde4913c09792445",
    measurementId: "G-6QE4L0TTYB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);