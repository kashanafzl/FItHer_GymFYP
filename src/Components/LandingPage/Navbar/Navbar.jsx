import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-black/80 backdrop-blur-md text-white fixed w-full top-0 left-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-white">FitHer </span>
          <span className="text-orange-500">Gym</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-300 font-medium">
          <li className="hover:text-orange-500 transition cursor-pointer">Home</li>
          <li className="hover:text-orange-500 transition cursor-pointer">Services</li>
          <li className="hover:text-orange-500 transition cursor-pointer">BMI</li>
          <li className="hover:text-orange-500 transition cursor-pointer">Plans</li>
          <li className="hover:text-orange-500 transition cursor-pointer">Contact</li>
        </ul>

        {/* Button */}
        <button className="hidden md:block bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-full font-semibold">
          Join Now
        </button>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden text-3xl cursor-pointer text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[400px] py-4 px-6" : "max-h-0"
        }`}
      >
        <div className="bg-black border-t border-gray-800 space-y-4">
          <p className="hover:text-orange-500 cursor-pointer">Home</p>
          <p className="hover:text-orange-500 cursor-pointer">Services</p>
          <p className="hover:text-orange-500 cursor-pointer">BMI</p>
          <p className="hover:text-orange-500 cursor-pointer">Plans</p>
          <p className="hover:text-orange-500 cursor-pointer">Contact</p>

          <button className="w-full mt-3 bg-orange-500 py-2 rounded-full font-semibold hover:bg-orange-600 transition">
            Join Now
          </button>
        </div>
      </div>
    </nav>
  );
}