import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  useParams
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import CategorySelection from "./pages/CategorySelection";
import ScrollOnTop from "./components/ScrollOnTop";
import AddQuestions from "./pages/AddQuestions";
import Results from "./pages/Results";

function AppWrapper() {
  const location = useLocation();

  const isCategoryPage = location.pathname
    .toLowerCase()
    .startsWith("/category");
  const isQuizPage = location.pathname.toLowerCase().startsWith("/quiz/");

  //1175 process 39 
  // 1661 product 21
  // 19 mentoring
  // 2190 wikipedia 6 pytan

  return (
    <div className="min-h-screen pt-3 w-full">
      {(isQuizPage || isCategoryPage ) && <Header />}

      <div className="max-w-3xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<CategorySelection />} />
          <Route path="/category/results" element={<Results />} />
          <Route path="/quiz/*" element={<Navigate to="/category" replace />} />
          <Route path="/quiz/:quizCategory" element={<Quiz />} />
          <Route path="/addQuestionsToDatabase" element={<AddQuestions />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollOnTop />
      <AppWrapper />
    </Router>
  );
}

export default App;
