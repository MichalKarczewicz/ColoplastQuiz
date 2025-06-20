import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { sampleSize, shuffle } from "lodash";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};


const firebaseApp = initializeApp(firebaseConfig);

// Cache na pytania
let catchedQuestions;

// Zamienia obiekt pytań na tablicę z id w polu 'id'
const transformToArray = (questions) =>
  Object.keys(questions).map((key) => ({
    id: key,
    ...questions[key],
  }));

// Pobierz wszystkie pytania z bazy (z cache)
const getAllQuestions = async () => {
  if (catchedQuestions) {
    return catchedQuestions;
  }

  const db = getDatabase(firebaseApp);
  const snapshot = await get(ref(db, "/quiz/questions"));
  const questionsFromDb = snapshot.val() || {};
  const questions = transformToArray(questionsFromDb);
  catchedQuestions = questions;
  return questions;
};

const getRandomQuestions = async () => {
  const questions = await getAllQuestions();
  const count = Math.min(10, questions.length);
  const randomQuestions = sampleSize(questions, count);

  return randomQuestions.map((question) => ({
    ...question,
    choices: shuffle(question.choices),
  }));
};

export { getRandomQuestions };
