import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function TrainingDetails() {
  const { type } = useParams();

  const program = {
    duration: "8 Weeks",
    level: "Beginner to Advanced",
    goal: "Build strength & muscle",
    calories: "2500 kcal",
    protein: "130g Protein",
  };

  const weeklyPlan = [
    { day: "Day 1", workout: "Chest + Triceps" },
    { day: "Day 2", workout: "Back + Biceps" },
    { day: "Day 3", workout: "Cardio / Rest" },
    { day: "Day 4", workout: "Legs" },
    { day: "Day 5", workout: "Shoulders" },
    { day: "Day 6", workout: "Full Body" },
    { day: "Day 7", workout: "Rest" },
  ];

  const exercises = [
    "Bench Press",
    "Squats",
    "Deadlift",
    "Pull Ups",
    "Shoulder Press",
  ];

  const diet = [
    { time: "🥣 Breakfast", food: "Eggs + Milk + Banana" },
    { time: "🍗 Lunch", food: "Chicken + Rice + Salad" },
    { time: "🥜 Snack", food: "Nuts + Peanut Butter" },
    { time: "🍛 Dinner", food: "Chicken / Fish + Vegetables" },
  ];

  const tips = [
    "💧 Drink 3-4 liters of water daily",
    "😴 Sleep at least 7-8 hours",
    "🔥 Stay consistent with workouts",
    "🍽 Avoid junk food",
  ];

  // ✅ DOWNLOAD FUNCTION
  const downloadPlan = () => {
    let content = `
🏋️ ${type.toUpperCase()} TRAINING PLAN

📅 Duration: ${program.duration}
📊 Level: ${program.level}
🔥 Goal: ${program.goal}
🍽 Calories: ${program.calories}
💪 Protein: ${program.protein}

----------------------------
📆 WEEKLY PLAN
----------------------------
${weeklyPlan.map(w => `${w.day}: ${w.workout}`).join("\n")}

----------------------------
🏋️ EXERCISES
----------------------------
${exercises.join("\n")}

----------------------------
🥗 DIET PLAN
----------------------------
${diet.map(d => `${d.time}: ${d.food}`).join("\n")}

----------------------------
💡 HEALTH TIPS
----------------------------
${tips.join("\n")}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}-training-plan.txt`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-black text-white min-h-screen px-6 py-16">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-orange-500 mb-8 text-center"
        >
          {type.toUpperCase()} TRAINING
        </motion.h1>

        {/* INFO CARDS */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card title="📅 Duration" value={program.duration} />
          <Card title="📊 Level" value={program.level} />
          <Card title="🔥 Calories" value={program.calories} />
          <Card title="💪 Protein" value={program.protein} />
        </div>

        {/* WEEKLY PLAN */}
        <Section title="Weekly Plan">
          <div className="grid md:grid-cols-3 gap-4">
            {weeklyPlan.map((item, i) => (
              <Box key={i}>
                <p className="text-orange-500">{item.day}</p>
                <p className="text-gray-300 text-sm">{item.workout}</p>
              </Box>
            ))}
          </div>
        </Section>

        {/* EXERCISES */}
        <Section title="Exercises">
          <div className="grid md:grid-cols-2 gap-3">
            {exercises.map((ex, i) => (
              <Box key={i}>• {ex}</Box>
            ))}
          </div>
        </Section>

        {/* DIET PLAN */}
        <Section title="Daily Diet Plan">
          <div className="grid md:grid-cols-2 gap-4">
            {diet.map((d, i) => (
              <Box key={i}>
                <p className="text-orange-500">{d.time}</p>
                <p className="text-gray-300 text-sm">{d.food}</p>
              </Box>
            ))}
          </div>
        </Section>

        {/* TIPS */}
        <Section title="Health Tips">
          <div className="grid md:grid-cols-2 gap-3">
            {tips.map((tip, i) => (
              <Box key={i}>{tip}</Box>
            ))}
          </div>
        </Section>

        {/* BUTTONS */}
        <div className="flex gap-4 justify-center mt-10">
          <button className="bg-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
            Start Workout
          </button>

          <button
            onClick={downloadPlan}
            className="border border-orange-500 px-6 py-3 rounded-full hover:bg-orange-500 transition"
          >
            Save Plan
          </button>
        </div>

      </div>
    </div>
  );
}

/* 🔹 Components */

function Card({ title, value }) {
  return (
    <div className="border border-gray-800 p-6 rounded-xl text-center">
      <p className="text-gray-400">{title}</p>
      <h3 className="text-xl text-orange-500 font-bold">{value}</h3>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold mb-4 text-orange-500">
        {title}
      </h2>
      {children}
    </motion.div>
  );
}

function Box({ children }) {
  return (
    <div className="border border-gray-800 p-4 rounded-lg hover:border-orange-500 transition">
      {children}
    </div>
  );
}