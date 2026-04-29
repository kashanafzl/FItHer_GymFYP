import React from "react";
import { motion } from "framer-motion";

export default function Diet() {

  const dietPlans = [
    {
      title: "💪 Muscle Gain",
      calories: "2800 kcal",
      protein: "140g Protein",
      schedule: "6 Meals / Day",
      items: ["🥚 Eggs", "🍗 Chicken", "🥛 Milk", "🍚 Rice", "🥜 Nuts"],
    },
    {
      title: "🔥 Fat Loss",
      calories: "1800 kcal",
      protein: "120g Protein",
      schedule: "4 Meals / Day",
      items: ["🥗 Salad", "🍗 Grilled Chicken", "🍎 Apple", "☕ Green Tea", "🥦 Vegetables"],
    },
    {
      title: "🌿 Vegetarian",
      calories: "2000 kcal",
      protein: "100g Protein",
      schedule: "5 Meals / Day",
      items: ["🥦 Vegetables", "🍌 Banana", "🥛 Milk", "🥜 Nuts", "🍚 Brown Rice"],
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
          Smart <span className="text-orange-500">Diet System</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-4 max-w-2xl mx-auto"
        >
          Personalized AI-based diet plans to help you gain muscle, lose fat, and stay healthy.
        </motion.p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {dietPlans.map((plan, i) => (
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
                {plan.title}
              </h3>

              {/* Stats */}
              <div className="text-sm text-gray-400 space-y-1 mb-4">
                <p>🔥 {plan.calories}</p>
                <p>💪 {plan.protein}</p>
                <p>📅 {plan.schedule}</p>
              </div>

              {/* Items */}
              <ul className="space-y-2 text-gray-300 mb-5">
                {plan.items.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>

              {/* Button */}
              <button className="w-full bg-orange-500 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                Select Plan
              </button>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}