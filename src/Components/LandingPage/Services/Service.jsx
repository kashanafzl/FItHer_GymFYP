import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDumbbell,
  FaHeartbeat,
  FaAppleAlt,
  FaRunning,
  FaUserInjured,
} from "react-icons/fa";

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
    {
      icon: <FaUserInjured />,
      title: "Patient Diet Plan",
      desc: "Special diet plans for patients with medical conditions like diabetes, BP, thyroid.",
      path: "/patient-diet",
    },
  ];

  return (
    <section id="services" className="bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold">
          Our <span className="text-orange-500">Services</span>
        </h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          We provide everything you need to transform your body and stay healthy.
        </p>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="cursor-pointer bg-[#111] border border-gray-800 rounded-xl p-8 text-center hover:border-orange-500 hover:scale-105 transition-all duration-300 group shadow-lg hover:shadow-orange-500/10"
            >
              {/* Icon */}
              <div className="text-5xl text-orange-500 mb-5 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* Arrow Indicator */}
              <div className="mt-4 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                Explore →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}