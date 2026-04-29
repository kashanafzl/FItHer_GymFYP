import React, { useState } from "react";
import { motion } from "framer-motion";

export default function FatLoss() {
  const [goal, setGoal] = useState("Fat Loss");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [aiDiet, setAiDiet] = useState([]);

  const weeklyPlan = [
    "Day 1: HIIT Cardio + Abs",
    "Day 2: Full Body Workout",
    "Day 3: Cardio + Core",
    "Day 4: Upper Body",
    "Day 5: Lower Body",
    "Day 6: HIIT + Cardio",
    "Day 7: Rest",
  ];

  const baseDiet = [
    "🥗 Salad + Grilled Chicken",
    "🍎 Fruits (Apple, Banana)",
    "☕ Green Tea",
    "🥦 Vegetables",
    "🥚 Boiled Eggs",
  ];

  // ✅ AI DIET GENERATOR (simple logic)
  const generateDiet = () => {
    if (!weight || !height) {
      alert("Please enter weight and height");
      return;
    }

    let diet = [];

    if (goal === "Fat Loss") {
      diet = [
        "🥗 High Protein Salad",
        "🍗 Grilled Chicken (Lean Protein)",
        "🥦 Green Vegetables",
        "☕ Green Tea (Fat Burner)",
        "🥚 Boiled Eggs",
      ];
    }

    if (goal === "Muscle Gain") {
      diet = [
        "🥚 Eggs + Milk Breakfast",
        "🍗 Chicken + Rice",
        "🥜 Nuts + Peanut Butter",
        "🥛 Protein Shake",
        "🍌 Banana Pre-workout",
      ];
    }

    if (goal === "Maintain") {
      diet = [
        "🥗 Balanced Salad",
        "🍗 Chicken / Fish",
        "🍚 Rice + Vegetables",
        "🍎 Fruits",
        "🥛 Milk",
      ];
    }

    setAiDiet(diet);
  };

  return (
    <div className="bg-black text-white min-h-screen px-6 py-16">

      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-orange-500"
        >
          AI Fat Loss Program
        </motion.h1>

        <p className="text-gray-400 mt-4">
          Smart AI generates your personalized diet plan
        </p>

        {/* INPUT SECTION */}
        <div className="grid md:grid-cols-3 gap-4 mt-10">

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="bg-black border border-gray-700 p-3 rounded text-white"
          >
            <option>Fat Loss</option>
            <option>Muscle Gain</option>
            <option>Maintain</option>
          </select>

          <input
            type="number"
            placeholder="Weight (kg)"
            className="bg-black border border-gray-700 p-3 rounded text-white"
            onChange={(e) => setWeight(e.target.value)}
          />

          <input
            type="number"
            placeholder="Height (cm)"
            className="bg-black border border-gray-700 p-3 rounded text-white"
            onChange={(e) => setHeight(e.target.value)}
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={generateDiet}
          className="mt-6 bg-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
        >
          Generate AI Diet Plan
        </button>

        {/* AI RESULT */}
        {aiDiet.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-left"
          >
            <h2 className="text-2xl font-bold text-orange-500 mb-4">
              Your AI Diet Plan
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {aiDiet.map((item, i) => (
                <div
                  key={i}
                  className="border border-gray-800 p-4 rounded-lg hover:border-orange-500"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* DEFAULT PLAN */}
        <div className="mt-14 text-left">

          <h2 className="text-2xl font-bold text-orange-500 mb-4">
            Weekly Workout Plan
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {weeklyPlan.map((item, i) => (
              <div key={i} className="border border-gray-800 p-4 rounded-lg">
                {item}
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}