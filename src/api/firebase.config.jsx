import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBKnWL7vrAA0lFJvFOAb7IKbej6ItScomE",
  authDomain: "canvas-game-b364f.firebaseapp.com",
  projectId: "canvas-game-b364f",
  storageBucket: "canvas-game-b364f.appspot.com",
  messagingSenderId: "392339662247",
  appId: "1:392339662247:web:3b2f9ae76710e768674282"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)