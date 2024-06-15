// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBujCnqkqz0uteDvNgW0aeTKgprlMzoOHY",
  authDomain: "signup-page-8fc18.firebaseapp.com",
  projectId: "signup-page-8fc18",
  storageBucket: "signup-page-8fc18.appspot.com",
  messagingSenderId: "608730024080",
  appId: "1:608730024080:web:dec8413511285a62ab3015"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, signOut };
