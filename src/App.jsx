import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import UploadResume from "./pages/UploadResume";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ATSReport from "./pages/ATSReport";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";


function App() {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />

      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadResume />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/report"
        element={
          <ProtectedRoute>
            <ATSReport />
          </ProtectedRoute>
        }
      />

    </Routes>
  )
}

export default App;