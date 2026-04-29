import React from "react";
import { motion } from "framer-motion";

export default function Health() {

  const healthData = [
    { title: "Monthly Goal", value: "Lose 3kg Fat" },
    { title: "Workout Days", value: "5 Days/Week" },
    { title: "Calories Target", value: "2200 kcal" },
    { title: "Water Intake", value: "3 Liters" },
  ];

  const dietPlan = [
    "🥚 Eggs (Protein rich breakfast)",
    "🍗 Chicken (Lean protein lunch)",
    "🥗 Salad (Fiber & vitamins)",
    "🍚 Rice (Energy source)",
    "🥛 Milk (Recovery & calcium)",
    "🍌 Banana (Pre-workout energy)",
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
          Health <span className="text-orange-500">Monthly Plan</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-4 max-w-2xl mx-auto"
        >
          Smart AI-based health tracking with personalized diet and workout planning.
        </motion.p>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mt-12">

          {healthData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="border border-gray-800 p-6 rounded-xl hover:border-orange-500 transition"
            >
              <h3 className="text-gray-400">{item.title}</h3>
              <p className="text-xl font-bold text-orange-500 mt-2">
                {item.value}
              </p>
            </motion.div>
          ))}

        </div>

        {/* DIET SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-left max-w-3xl mx-auto"
        >

          <h3 className="text-2xl font-bold text-center mb-6">
            Daily <span className="text-orange-500">Diet Plan</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-4">

            {dietPlan.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border border-gray-800 p-4 rounded-lg hover:border-orange-500 transition"
              >
                {item}
              </motion.div>
            ))}

          </div>

        </motion.div>

      </div>
    </section>
  );
}