import { FC } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Application from "./pages/Application";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./pages/Signup";

const AppRoutes: FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/application" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/application" /> : <Signup />}
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/application" /> : <Login />}
      />
      <Route
        path="/application"
        element={
          <PrivateRoute>
            <Application />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

const App: FC = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
      <ToastContainer />
    </>
  );
};

export default App;
