// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { 
  getFirestore, collection, addDoc, getDocs 
} from "firebase/firestore";
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, onAuthStateChanged
} from "firebase/auth"; // ✨ Firebase Auth Import

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr_JDR-CwRbmnqYCSmtSVMJ8Kp44yO7Sc",
  authDomain: "boyeong-a9dce.firebaseapp.com",
  projectId: "boyeong-a9dce",
  storageBucket: "boyeong-a9dce.appspot.com",
  messagingSenderId: "228968732832",
  appId: "1:228968732832:web:c04a4cf2cba7763066d1c5",
  measurementId: "G-0GXLCBM0ZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); //  Auth Initialized

// ======================
// Authentication Utils
// ======================

export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ Logged in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("🔥 Login error:", error.message);
    throw error;
  }
}

export async function register(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("✅ Registered:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("🔥 Register error:", error.message);
    throw error;
  }
}

export async function logout() {
  try {
    await signOut(auth);
    console.log("👋 Logged out");
  } catch (error) {
    console.error("🔥 Logout error:", error.message);
  }
}

// 🔍 Listen for Auth Changes
export function onAuthStateChange(callback) {
  return onAuthStateChanged(auth, callback); // Callback receives user or null
}

// =============
// 🔤 Firestore
// =============

export async function saveWordToFirebase(word, translation) {
  try {
    await addDoc(collection(db, "savedWords"), { word, translation });
    console.log("✅ Word saved:", word);
  } catch (error) {
    console.error("🔥 Error saving word:", error);
  }
}

export async function getSavedWords() {
  try {
    const querySnapshot = await getDocs(collection(db, "savedWords"));
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("🔥 Error fetching words:", error);
    return [];
  }
}

// Export everything
export { db, auth };
