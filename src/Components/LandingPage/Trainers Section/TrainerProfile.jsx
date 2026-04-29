import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

export default function TrainerProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p>Trainer not found</p>
      </div>
    );
  }

  const whatsappLink = `https://wa.me/${state.phone}`;

  return (
    <div className="bg-black text-white min-h-screen px-6 py-16">

      <div className="max-w-4xl mx-auto text-center">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-orange-500"
        >
          ← Back
        </button>

        {/* IMAGE */}
        <img
          src={state.img}
          className="w-44 h-44 mx-auto rounded-full object-cover border-4 border-orange-500"
        />

        {/* NAME */}
        <h1 className="text-3xl font-bold mt-4 text-orange-500">
          {state.name}
        </h1>

        <p className="text-gray-300 mt-2">{state.role}</p>
        <p className="text-gray-500">{state.exp}</p>

        {/* ABOUT */}
        <div className="mt-8 border border-gray-800 p-6 rounded-xl text-left">
          <h2 className="text-xl font-bold text-orange-500 mb-2">
            About Trainer
          </h2>

          <p className="text-gray-400">
            {state.name} is a professional fitness coach specialized in{" "}
            {state.role}. He helps clients with workout plans, fat loss,
            muscle gain and nutrition guidance.
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">

          {/* WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            className="flex items-center justify-center gap-2 bg-green-500 px-6 py-3 rounded-full font-semibold hover:bg-green-600"
          >
            <FaWhatsapp size={20} />
            Contact WhatsApp
          </a>

          {/* Book */}
          <button className="bg-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-orange-600">
            Book Session
          </button>

        </div>

      </div>
    </div>
  );
}