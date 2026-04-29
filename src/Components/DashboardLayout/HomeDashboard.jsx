import React, { useEffect, useState } from "react";

export default function HomeDashboard() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // localStorage se user data lo
    const userData = localStorage.getItem("user");
    
    if (userData) {
      const user = JSON.parse(userData);
      // User ka name set karo (agar name nahi hai toh email se pehla part le lo)
      setUserName(user.name || user.email?.split("@")[0] || "User");
    }
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">
        Welcome Back, <span className="text-orange-500">{userName}</span> 👋
      </h2>
      <p className="text-gray-400 mb-6 text-sm">
        Here's your fitness summary for today
      </p>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="p-5 bg-[#111] rounded-xl border border-gray-800 hover:border-orange-500 transition-all duration-300">
          <p className="text-gray-400 text-sm mb-1">Calories</p>
          <h3 className="text-orange-500 text-2xl font-bold">1250 kcal</h3>
        </div>

        <div className="p-5 bg-[#111] rounded-xl border border-gray-800 hover:border-orange-500 transition-all duration-300">
          <p className="text-gray-400 text-sm mb-1">Workouts</p>
          <h3 className="text-orange-500 text-2xl font-bold">12</h3>
        </div>

        <div className="p-5 bg-[#111] rounded-xl border border-gray-800 hover:border-orange-500 transition-all duration-300">
          <p className="text-gray-400 text-sm mb-1">Active Time</p>
          <h3 className="text-orange-500 text-2xl font-bold">9 hrs</h3>
        </div>
      </div>
    </div>
  );
}