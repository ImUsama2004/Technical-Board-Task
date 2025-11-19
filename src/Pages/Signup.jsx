import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const valid =
      user.name.trim() &&
      user.email.includes("@") &&
      user.password.length >= 6 &&
      user.password === user.confirmPassword;
    setIsValid(valid);
  }, [user]);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    if (!isValid) return;

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: user.name, email: user.email, password: user.password })
      });

      if (response.ok) {
        alert("An Email is sent to you!Click on the Link to verify your email, and then Login")
        navigate("/login"); // go to login after successful signup
      } else {
        const data = await response.json();
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-5xl mt-8 mb-6 px-4">
        <Header />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Create Account
        </h2>

        {/* Full Name */}
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={user.name}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
        />

        {/* Email */}
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
        />

        {/* Password */}
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter a password (min 6 chars)"
          value={user.password}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
        />

        {/* Confirm Password */}
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={user.confirmPassword}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-4"
        />

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          disabled={!isValid}
          className={`w-full py-2 rounded font-semibold transition-colors ${
            isValid
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Sign Up
        </button>

        {/* Redirect to Login */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
