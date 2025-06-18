import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB24hy1uI_eXoB3TeMQAGcDU8YU2mkzA4M",
  authDomain: "quizc-95de4.firebaseapp.com",
  projectId: "quizc-95de4",
  storageBucket: "quizc-95de4.firebasestorage.app",
  messagingSenderId: "74551304459",
  appId: "1:74551304459:web:477fd90842276e1674820e",
  measurementId: "G-QBK7S0T13P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);