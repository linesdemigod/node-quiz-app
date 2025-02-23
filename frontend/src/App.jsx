import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import { QuestionProvider } from "./context/QuestionContext";
import { QuizProvider } from "./context/QuizContext";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/student/QuizPage";
import UserPage from "./pages/admin/UserPage";
import QuestionPage from "./pages/student/QuestionPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminQuizPage from "./pages/admin/QuizPage";
import AdminQuestionPage from "./pages/admin/QuestionPage";
import AdminCreateQuestion from "./pages/admin/CreateQuestion";
import AdminEditQuestion from "./pages/admin/EditQuestion";
import PublicRoute from "./components/PublicRoute";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/student/ProfilePage";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <QuizProvider>
          <QuestionProvider>
            <Router>
              <Routes>
                {/* public */}
                <Route element={<PublicRoute />}>
                  <Route path="/" element={<UserLayout />}>
                    <Route index element={<QuizPage />} />
                    <Route path="question/:id" element={<QuestionPage />} />
                    <Route path="login" element={<HomePage />} />
                    <Route path="register" element={<RegisterPage />} />
                  </Route>
                </Route>

                {/* protected user route */}
                <Route element={<PrivateRoute role="student" />}>
                  <Route path="/student" element={<UserLayout />}>
                    <Route index element={<QuizPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                  </Route>
                </Route>

                {/* protected admin routes */}
                <Route element={<PrivateRoute role="admin" />}>
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminPage />} />
                    <Route path="quiz" element={<AdminQuizPage />} />
                    <Route
                      path="questions/:id"
                      element={<AdminQuestionPage />}
                    />
                    <Route
                      path="create-question/:id"
                      element={<AdminCreateQuestion />}
                    />
                    <Route
                      path="edit-question/:id"
                      element={<AdminEditQuestion />}
                    />
                  </Route>
                </Route>
              </Routes>
            </Router>
            <ToastContainer />
          </QuestionProvider>
        </QuizProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
