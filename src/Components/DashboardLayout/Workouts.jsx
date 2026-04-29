import React, { useState } from "react";

const workoutCategories = [
  {
    title: "Chest",
    exercises: ["Bench Press", "Push Ups", "Chest Fly", "Incline Press"],
    icon: "🏋️",
    color: "from-red-500 to-orange-500",
  },
  {
    title: "Back",
    exercises: ["Pull Ups", "Deadlift", "Rows", "Lat Pulldown"],
    icon: "🔙",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Legs",
    exercises: ["Squats", "Lunges", "Leg Press", "Calf Raises"],
    icon: "🦵",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Shoulders",
    exercises: ["Overhead Press", "Lateral Raise", "Front Raise"],
    icon: "🦾",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Arms",
    exercises: ["Bicep Curls", "Tricep Dips", "Hammer Curls"],
    icon: "💪",
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Abs",
    exercises: ["Crunches", "Plank", "Leg Raises", "Russian Twist"],
    icon: "🧱",
    color: "from-pink-500 to-red-500",
  },
];

export default function Workouts() {
  const [selected, setSelected] = useState(null);
  const [completed, setCompleted] = useState([]);

  const toggleComplete = (exercise) => {
    setCompleted((prev) =>
      prev.includes(exercise)
        ? prev.filter((e) => e !== exercise)
        : [...prev, exercise]
    );
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2">
        Workout <span className="text-orange-500">Plans</span>
      </h2>
      <p className="text-gray-400 mb-8 text-sm">
        Select a muscle group to start training
      </p>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {workoutCategories.map((cat) => (
          <div
            key={cat.title}
            onClick={() => setSelected(selected === cat.title ? null : cat.title)}
            className={`
              p-5 rounded-xl cursor-pointer border transition-all duration-300
              ${
                selected === cat.title
                  ? `bg-gradient-to-br ${cat.color} border-transparent shadow-lg scale-105`
                  : "bg-[#111] border-gray-800 hover:border-orange-500"
              }
            `}
          >
            <span className="text-3xl">{cat.icon}</span>
            <h3 className="text-white font-semibold mt-2">{cat.title}</h3>
            <p className="text-gray-400 text-xs">
              {cat.exercises.length} exercises
            </p>
          </div>
        ))}
      </div>

      {/* Selected Category Details */}
      {selected && (
        <div className="bg-[#111] border border-gray-800 rounded-xl p-6 animate-fadeIn">
          <h3 className="text-xl font-bold text-white mb-4">
            {selected} Exercises
          </h3>
          <div className="space-y-3">
            {workoutCategories
              .find((c) => c.title === selected)
              ?.exercises.map((exercise) => (
                <div
                  key={exercise}
                  onClick={() => toggleComplete(exercise)}
                  className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-gray-800 hover:border-orange-500 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        completed.includes(exercise)
                          ? "bg-orange-500 border-orange-500"
                          : "border-gray-600"
                      }`}
                    >
                      {completed.includes(exercise) && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                    <span
                      className={`${
                        completed.includes(exercise)
                          ? "line-through text-gray-500"
                          : "text-white"
                      }`}
                    >
                      {exercise}
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">3 x 12</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}