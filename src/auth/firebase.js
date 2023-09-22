// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRoYsBG9kf_mfwHDuPY7DxAZXQfgfbQ3o",
  authDomain: "drag-dropimages.firebaseapp.com",
  projectId: "drag-dropimages",
  storageBucket: "drag-dropimages.appspot.com",
  messagingSenderId: "477243690140",
  appId: "1:477243690140:web:16439adf1a2bb89b12b159",
  measurementId: "G-0ET9RPJPD8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
