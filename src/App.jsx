import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";

function AppWrapper() {
  const location = useLocation();
  const isQuizPage = location.pathname.toLowerCase().includes("/quiz");

  return (
    <div className="min-h-screen pt-3 w-full">
      {isQuizPage && <Header />}
      <div className="max-w-3xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Quiz" element={<Quiz />} />
          {/* Catch-all: przekierowanie na / */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
