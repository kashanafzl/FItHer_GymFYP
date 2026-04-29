import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import trainer1 from "../../../Assets/10.jpg";
import trainer2 from "../../../Assets/7.jpg";
import trainer3 from "../../../Assets/8.jpg";
import trainer4 from "../../../Assets/9.jpg";

export default function Trainers() {
  const navigate = useNavigate();

  const trainers = [
    {
      name: "John Smith",
      role: "Strength Coach",
      exp: "8 Years Experience",
      phone: "923001112233",
      img: trainer1,
    },
    {
      name: "Emma Wilson",
      role: "Fat Loss Specialist",
      exp: "6 Years Experience",
      phone: "923004445566",
      img: trainer2,
    },
    {
      name: "Mike Johnson",
      role: "Cardio Trainer",
      exp: "5 Years Experience",
      phone: "923007778899",
      img: trainer3,
    },
    {
      name: "Sarah Lee",
      role: "Yoga & Flexibility",
      exp: "7 Years Experience",
      phone: "923009991111",
      img: trainer4,
    },
  ];

  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold"
        >
          Our <span className="text-orange-500">Trainers</span>
        </motion.h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Professional certified trainers to guide your fitness journey.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

          {trainers.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="border border-gray-800 rounded-xl overflow-hidden hover:border-orange-500 transition"
            >

              <img src={t.img} className="w-full h-60 object-cover" />

              <div className="p-5 text-left">

                <h3 className="text-xl font-bold text-orange-500">
                  {t.name}
                </h3>

                <p className="text-gray-300 text-sm mt-1">{t.role}</p>
                <p className="text-gray-500 text-sm mt-1">{t.exp}</p>

                <button
                  onClick={() =>
                    navigate(`/trainer/${t.name}`, { state: t })
                  }
                  className="mt-4 w-full bg-orange-500 py-2 rounded-full hover:bg-orange-600 transition"
                >
                  View Profile
                </button>

              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}