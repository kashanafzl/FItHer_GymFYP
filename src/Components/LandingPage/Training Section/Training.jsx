import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Training() {
  const navigate = useNavigate();

  const programs = [
    {
      title: "🏋️ Strength Training",
      level: "Beginner to Advanced",
      duration: "8 Weeks",
      trainer: "Expert Coach",
      desc: "Build muscle, increase strength and transform your physique.",
      path: "/training/strength",
    },
    {
      title: "🔥 Fat Loss Program",
      level: "All Levels",
      duration: "6 Weeks",
      trainer: "Certified Trainer",
      desc: "Burn fat quickly with structured workouts and diet control.",
      path: "/fat-loss",
    },
    {
      title: "🏃 Cardio Training",
      level: "Beginner",
      duration: "4 Weeks",
      trainer: "Fitness Coach",
      desc: "Improve stamina, heart health and endurance.",
      path: "/cardio",
    },
    {
      title: "🤸 Flexibility & Yoga",
      level: "All Levels",
      duration: "5 Weeks",
      trainer: "Yoga Expert",
      desc: "Enhance flexibility, balance and mental wellness.",
      path: "/training/yoga",
    },
  ];

  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold"
        >
          Training <span className="text-orange-500">Programs</span>
        </motion.h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Choose the best training program designed by experts.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

          {programs.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="border border-gray-800 rounded-xl p-6 text-left hover:border-orange-500 transition"
            >

              <h3 className="text-lg font-semibold text-orange-500 mb-2">
                {item.title}
              </h3>

              <div className="text-sm text-gray-400 space-y-1 mb-3">
                <p>📊 Level: {item.level}</p>
                <p>⏱ Duration: {item.duration}</p>
                <p>👨‍🏫 Trainer: {item.trainer}</p>
              </div>

              <p className="text-gray-300 text-sm mb-5">
                {item.desc}
              </p>

              <button
                onClick={() => navigate(item.path)}
                className="w-full bg-orange-500 py-2 rounded-lg font-semibold"
              >
                Start Training
              </button>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}