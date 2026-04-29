import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaBars,
  FaTimes,
  FaDumbbell,
  FaAppleAlt,
  FaCalculator,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { icon: <FaHome />, text: "Dashboard", path: "/dashboard" },
    { icon: <FaDumbbell />, text: "Workouts", path: "/dashboard/workouts" },
    { icon: <FaAppleAlt />, text: "Diet Plans", path: "/dashboard/diet" },
    { icon: <FaCalculator />, text: "BMI Calculator", path: "/dashboard/bmi" },
    { icon: <FaChartLine />, text: "Progress", path: "/dashboard/progress" },
    { icon: <FaUser />, text: "Profile", path: "/dashboard/profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex bg-black text-white min-h-screen">
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-3 bg-black border-b border-gray-800 z-50">
        <h1 className="text-orange-500 font-bold text-xl">FitHer AI</h1>

        <button
          onClick={() => setOpen(!open)}
          className="text-white text-xl"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full w-72
          bg-[#0a0a0a] border-r border-gray-800 p-6 z-40
          transition-transform duration-300 flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <h1 className="text-2xl font-bold text-orange-500 mb-10">
          🏋️ FitHer
        </h1>

        {/* Menu Items */}
        <div className="space-y-2 flex-1">
          {menu.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              className={`
                flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                ${
                  location.pathname === item.path
                    ? "bg-orange-500 text-black font-semibold shadow-lg shadow-orange-500/20"
                    : "text-gray-400 hover:bg-gray-900 hover:text-white"
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.text}</span>
              
              {/* Active Indicator */}
              {location.pathname === item.path && (
                <span className="ml-auto w-2 h-2 rounded-full bg-black" />
              )}
            </div>
          ))}
        </div>

        {/* User Quick Info */}
        <div className="border-t border-gray-800 pt-4 mt-4">
          <div className="flex items-center gap-3 mb-3 px-3">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-black font-bold text-lg">
              {JSON.parse(localStorage.getItem("user") || "{}")?.name
                ?.charAt(0)
                ?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">
                {JSON.parse(localStorage.getItem("user") || "{}")?.name ||
                  "User"}
              </p>
              <p className="text-gray-500 text-xs truncate">
                {JSON.parse(localStorage.getItem("user") || "{}")?.email ||
                  ""}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* OVERLAY (Mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 md:p-8 mt-16 md:mt-0 overflow-y-auto max-h-screen">
        {children}
      </div>
    </div>
  );
}