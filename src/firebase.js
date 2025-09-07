import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAg6wzGkzbiALmc3Ta-roQItjiC5mScbtQ",
  authDomain: "sharpener-ecommerce-190d1.firebaseapp.com",
  projectId: "sharpener-ecommerce-190d1",
  storageBucket: "sharpener-ecommerce-190d1.firebasestorage.app",
  messagingSenderId: "475377477462",
  appId: "1:475377477462:web:6bf2ddf5f4ceaa514218f7",
  measurementId: "G-YCCEYF8D81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);