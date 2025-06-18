import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { sampleSize, shuffle } from "lodash";

const firebaseConfig = {
  apiKey: "AIzaSyB24hy1uI_eXoB3TeMQAGcDU8YU2mkzA4M",
  authDomain: "quizc-95de4.firebaseapp.com",
  projectId: "quizc-95de4",
  storageBucket: "quizc-95de4.firebasestorage.app",
  messagingSenderId: "74551304459",
  appId: "1:74551304459:web:477fd90842276e1674820e",
  measurementId: "G-QBK7S0T13P",
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
