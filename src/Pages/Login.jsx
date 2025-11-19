import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const valid = data.email.includes("@") && data.password.length >= 6;
    setIsValid(valid);
  }, [data]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    if (!isValid) return;

    try {
      // Replace with your actual API endpoint
      const response = await fetch("https://ttb.digipakistan.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Save token in localStorage
        localStorage.setItem("token", result.token); 
        navigate("/form"); // Redirect after login
      } else {
        alert(result.message || "Invalid credentials!");
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
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={data.email}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-4"
        />

        <button
          onClick={handleLogin}
          disabled={!isValid}
          className={`w-full py-2 rounded font-semibold transition-colors ${
            isValid
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
