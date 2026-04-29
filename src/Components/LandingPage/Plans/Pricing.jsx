import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Monthly Plan",
      price: "₹1999",
      features: [
        "Full Gym Access",
        "Basic Workout Plan",
        "Diet Guide",
        "Community Support",
      ],
    },
    {
      name: "Premium Plan",
      price: "₹3999",
      features: [
        "All Monthly Features",
        "Personal Trainer",
        "AI Diet Generator",
        "Weekly Progress Tracking",
      ],
      highlight: true,
    },
    {
      name: "Annual Plan",
      price: "₹14999",
      features: [
        "All Premium Features",
        "1 Year Access",
        "Priority Trainer Support",
        "Custom Fitness Plan",
      ],
    },
  ];

  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold"
        >
          Pricing <span className="text-orange-500">Plans</span>
        </motion.h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Choose the perfect plan for your fitness journey
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {plans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`border rounded-xl p-6 text-left transition
              ${plan.highlight
                  ? "border-orange-500 bg-gray-900"
                  : "border-gray-800"
                }`}
            >

              {/* Plan Name */}
              <h3 className="text-xl font-bold text-orange-500">
                {plan.name}
              </h3>

              {/* Price */}
              <p className="text-3xl font-bold mt-3">
                {plan.price}
                <span className="text-sm text-gray-400"> / month</span>
              </p>

              {/* Features */}
              <ul className="mt-5 space-y-2 text-gray-300 text-sm">
                {plan.features.map((f, index) => (
                  <li key={index}>✔ {f}</li>
                ))}
              </ul>

              {/* Button */}
              <button
                onClick={() => navigate("/signup")}
                className="mt-6 w-full bg-orange-500 py-2 rounded-full font-semibold hover:bg-orange-600 transition"
              >
                Get Started
              </button>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}