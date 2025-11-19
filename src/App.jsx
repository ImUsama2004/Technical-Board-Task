import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import MultiStepForm from "./component/MultiStepForm";

function App() {
  const isLoggedIn = localStorage.getItem("token"); // token key used in Login component

  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/form" /> : <Navigate to="/login" />}
        />

        {/* Signup Page - always accessible */}
        <Route path="/signup" element={<Signup />} />

        {/* Login Page - always accessible */}
        <Route path="/login" element={<Login />} />

        {/* MultiStepForm - Protected Route */}
        <Route
          path="/form"
          element={isLoggedIn ? <MultiStepForm /> : <Navigate to="/login" />}
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
