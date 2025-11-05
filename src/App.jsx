import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import MultiStepForm from "./component/MultiStepForm";

function App() {
  // Check if user is logged in by seeing if token exists
  // const isLoggedIn = localStorage.getItem("token");
  const isLoggedIn = "djflaksjflkjadslkfj"

  return (
    <Router>
      <Routes>
        {/* First visit defaults to Signup */}
        <Route path="/" element={<Navigate to="/signup" />} />

        {/* Signup Page */}
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/form" /> : <Signup />}
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/form" /> : <Login />}
        />

        {/* MultiStepForm - Protected Route */}
        <Route
          path="/form"
          element={isLoggedIn ? <MultiStepForm /> : <Navigate to="/login" />}
        />

        {/* Redirect unknown routes to signup */}
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
}

export default App;
