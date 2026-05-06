import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleJoinClick = () => {
    setOpen(false);
    navigate("/signup");
  };

  return (
    <nav className="bg-black/80 backdrop-blur-md text-white fixed w-full top-0 left-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <Link to="/" onClick={() => setOpen(false)}>
          <h1 className="text-2xl font-bold tracking-wide">
            <span className="text-white">FitHer </span>
            <span className="text-orange-500">Gym</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-300 font-medium items-center">
          <Link to="/" onClick={() => setOpen(false)}>
            <li className="hover:text-orange-500 transition cursor-pointer">Home</li>
          </Link>
          
          <a href="#services" onClick={() => setOpen(false)}>
            <li className="hover:text-orange-500 transition cursor-pointer">Services</li>
          </a>
          
          <Link to="/dashboard/bmi" onClick={() => setOpen(false)}>
            <li className="hover:text-orange-500 transition cursor-pointer">BMI</li>
          </Link>
          
          <a href="#plans" onClick={() => setOpen(false)}>
            <li className="hover:text-orange-500 transition cursor-pointer">Plans</li>
          </a>
          
          <Link to="/contact" onClick={() => setOpen(false)}>
            <li className="hover:text-orange-500 transition cursor-pointer">Contact</li>
          </Link>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">
                <button className="bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-full font-semibold">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="border border-gray-700 hover:border-red-500 hover:text-red-500 transition px-5 py-2 rounded-full font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="border border-gray-700 hover:border-orange-500 hover:text-orange-500 transition px-5 py-2 rounded-full font-semibold">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-full font-semibold">
                  Join Now
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
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
          open ? "max-h-[500px] py-4 px-6 border-t border-gray-800" : "max-h-0"
        }`}
      >
        <div className="bg-black space-y-4 pb-4">
          <Link to="/" onClick={() => setOpen(false)}>
            <p className="hover:text-orange-500 cursor-pointer py-2">🏠 Home</p>
          </Link>
          
          <a href="#services" onClick={() => setOpen(false)}>
            <p className="hover:text-orange-500 cursor-pointer py-2">💪 Services</p>
          </a>
          
          <Link to="/dashboard/bmi" onClick={() => setOpen(false)}>
            <p className="hover:text-orange-500 cursor-pointer py-2">🧮 BMI Calculator</p>
          </Link>
          
          <a href="#plans" onClick={() => setOpen(false)}>
            <p className="hover:text-orange-500 cursor-pointer py-2">📋 Plans</p>
          </a>
          
          <Link to="/contact" onClick={() => setOpen(false)}>
            <p className="hover:text-orange-500 cursor-pointer py-2">📞 Contact</p>
          </Link>

          {/* Mobile Buttons */}
          <div className="pt-2 space-y-3">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)}>
                  <button className="w-full bg-orange-500 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
                    📊 Dashboard
                  </button>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full border border-red-500 text-red-500 py-3 rounded-full font-semibold hover:bg-red-500 hover:text-white transition"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  <button className="w-full border border-gray-700 py-3 rounded-full font-semibold hover:border-orange-500 hover:text-orange-500 transition">
                    🔑 Login
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  <button className="w-full bg-orange-500 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
                    🚀 Join Now
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}