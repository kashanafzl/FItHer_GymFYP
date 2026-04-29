import React from "react";
import { useNavigate } from "react-router-dom";
import { FaDumbbell, FaHeartbeat, FaAppleAlt, FaRunning } from "react-icons/fa";

export default function Services() {
  const navigate = useNavigate();

  const services = [
    {
      icon: <FaDumbbell />,
      title: "Strength Training",
      desc: "Build muscle with modern equipment and expert trainers.",
      path: "/strength",
    },
    {
      icon: <FaHeartbeat />,
      title: "Health Monitoring",
      desc: "Track your body stats and improve overall fitness.",
      path: "/health",
    },
    {
      icon: <FaAppleAlt />,
      title: "Diet Plans",
      desc: "Personalized diet plans based on your health condition.",
      path: "/diet",
    },
    {
      icon: <FaRunning />,
      title: "Cardio Training",
      desc: "Boost stamina with high intensity cardio workouts.",
      path: "/cardio",
    },
  ];

  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold">
          Our <span className="text-orange-500">Services</span>
        </h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          We provide everything you need to transform your body and stay healthy.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

          {services.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="cursor-pointer border border-gray-800 rounded-xl p-6 text-center hover:border-orange-500 hover:scale-105 transition duration-300"
            >
              {/* Icon */}
              <div className="text-4xl text-orange-500 mb-4 flex justify-center">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 mt-3 text-sm">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}