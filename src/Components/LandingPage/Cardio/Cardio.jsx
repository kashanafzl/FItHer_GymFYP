import React from "react";
import { motion } from "framer-motion";

export default function Cardio() {

  const cardioData = [
    {
      title: "🏃 Running",
      calories: "500-700 kcal",
      time: "30-60 min",
      desc: "Improve stamina and burn fat quickly with outdoor or treadmill running.",
    },
    {
      title: "🚴 Cycling",
      calories: "400-600 kcal",
      time: "40-70 min",
      desc: "Low impact workout for legs and cardiovascular health.",
    },
    {
      title: "🔥 HIIT Workout",
      calories: "600-900 kcal",
      time: "20-30 min",
      desc: "High intensity training for maximum fat burn in minimum time.",
    },
  ];

  return (
    <section className="bg-black text-white py-20 px-6">

      <div className="max-w-7xl mx-auto text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold"
        >
          Cardio <span className="text-orange-500">Training</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-4 max-w-2xl mx-auto"
        >
          Boost your stamina, burn fat and improve heart health with advanced cardio workouts.
        </motion.p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {cardioData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="border border-gray-800 rounded-xl p-6 text-left hover:border-orange-500 transition"
            >

              {/* Title */}
              <h3 className="text-xl font-semibold text-orange-500 mb-3">
                {item.title}
              </h3>

              {/* Info */}
              <div className="text-sm text-gray-400 space-y-1 mb-3">
                <p>🔥 Calories: {item.calories}</p>
                <p>⏱ Time: {item.time}</p>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-5">
                {item.desc}
              </p>

              {/* Button */}
              <button className="w-full bg-orange-500 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                Start Workout
              </button>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}