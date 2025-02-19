import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index path="/" element={<LoginPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
