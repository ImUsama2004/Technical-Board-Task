import React from "react";

const Header = () => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 bg-white p-6 rounded-xl shadow-lg">
      {/* Left Logo */}
      <img
        src="/govt_logo.jpg"
        alt="Government Logo"
        className="h-20 w-20 object-contain"
      />

      {/* Title Block */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-800">
          Affiliation & Registration Application
        </h1>
        <p className="mt-2 font-bold text-sm sm:text-md text-gray-600">
          GOVT OF KHYBER PAKHTUNKHWA TRADE TESTING BOARD
        </p>
      </div>

      {/* Right Logo */}
      <img
        src="/ttb_logo.jpg"
        alt="TTB Logo"
        className="h-20 w-20 object-contain"
      />
    </header>
  );
};

export default Header;
