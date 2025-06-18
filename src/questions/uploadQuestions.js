import fs from "fs/promises";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB24hy1uI_eXoB3TeMQAGcDU8YU2mkzA4M",
    authDomain: "quizc-95de4.firebaseapp.com",
    projectId: "quizc-95de4",
    storageBucket: "quizc-95de4.firebasestorage.app",
    messagingSenderId: "74551304459",
    appId: "1:74551304459:web:477fd90842276e1674820e",
    measurementId: "G-QBK7S0T13P"
  };
  

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const upload = async () => {
  const questionsJson = await fs.readFile('questions.json', 'utf-8');
  const questions = JSON.parse(questionsJson);
  console.log(`${questions.length} questions will be uploaded to firebase`);

  const questionsRef = ref(database, '/quiz/questions');

  for (const q of questions) {
    await push(questionsRef, q);
  }

  console.log("Done");
};

upload().catch(console.error);
