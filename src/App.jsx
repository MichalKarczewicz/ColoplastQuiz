import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  useParams
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import CategorySelection from "./pages/CategorySelection";
import ScrollOnTop from "./components/ScrollOnTop";
import AddQuestions from "./pages/AddQuestions";
import Results from "./pages/Results";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import AuthenticatedPage from "./components/AuthenticatedPage";

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
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/addQuestionsToDatabase" element={<AuthenticatedPage />}>
             <Route path="/addQuestionsToDatabase" element={<AddQuestions />} />
          </Route> 
          <Route path="/category/results" element={<Results />} />
          <Route path="/quiz/*" element={<Navigate to="/category" replace />} />
          <Route path="/quiz/:quizCategory" element={<Quiz />} />
           <Route path="/addQuestionsToDatabase" element={<AddQuestions />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
