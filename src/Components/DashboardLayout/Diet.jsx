import React, { useState } from "react";

const mealPlans = [
  {
    title: "Muscle Gain",
    icon: "💪",
    calories: "2800 kcal",
    meals: [
      { name: "Breakfast", food: "Oats + 6 Eggs + Banana", time: "7:00 AM" },
      { name: "Lunch", food: "Chicken Breast + Rice + Veggies", time: "1:00 PM" },
      { name: "Snack", food: "Protein Shake + Nuts", time: "4:00 PM" },
      { name: "Dinner", food: "Fish + Sweet Potato + Salad", time: "8:00 PM" },
    ],
  },
  {
    title: "Fat Loss",
    icon: "🔥",
    calories: "1800 kcal",
    meals: [
      { name: "Breakfast", food: "Oats + 2 Eggs + Apple", time: "7:00 AM" },
      { name: "Lunch", food: "Grilled Chicken + Quinoa", time: "1:00 PM" },
      { name: "Snack", food: "Green Tea + Almonds (5)", time: "4:00 PM" },
      { name: "Dinner", food: "Soup + Grilled Fish", time: "7:00 PM" },
    ],
  },
  {
    title: "Keto Diet",
    icon: "🥑",
    calories: "2000 kcal",
    meals: [
      { name: "Breakfast", food: "Avocado + Bacon + Eggs", time: "8:00 AM" },
      { name: "Lunch", food: "Salmon + Broccoli + Butter", time: "1:00 PM" },
      { name: "Snack", food: "Cheese + Olives", time: "4:00 PM" },
      { name: "Dinner", food: "Steak + Asparagus", time: "8:00 PM" },
    ],
  },
];

export default function Diet() {
  const [selectedPlan, setSelectedPlan] = useState(0);

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2">
        Diet <span className="text-orange-500">Plans</span>
      </h2>
      <p className="text-gray-400 mb-8 text-sm">
        Choose your nutrition plan
      </p>

      {/* Plan Tabs */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {mealPlans.map((plan, index) => (
          <button
            key={plan.title}
            onClick={() => setSelectedPlan(index)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              selectedPlan === index
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                : "bg-[#111] text-gray-400 border border-gray-800 hover:border-orange-500"
            }`}
          >
            {plan.icon} {plan.title}
          </button>
        ))}
      </div>

      {/* Selected Plan Meals */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">
            {mealPlans[selectedPlan].title} Plan
          </h3>
          <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            {mealPlans[selectedPlan].calories}
          </span>
        </div>

        <div className="space-y-4">
          {mealPlans[selectedPlan].meals.map((meal, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 bg-black/50 rounded-lg border border-gray-800 hover:border-orange-500 transition-all"
            >
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500 font-bold">
                {i + 1}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold">{meal.name}</h4>
                <p className="text-gray-400 text-sm">{meal.food}</p>
              </div>
              <span className="text-orange-500 text-sm">{meal.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}