import React from "react";
import aboutImg from "../../../Assets/5.jpg"; // apni image use karo

export default function About() {
  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left Image */}
        <div className="w-full h-[400px] overflow-hidden rounded-xl">
          <img
            src={aboutImg}
            alt="about gym"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            About <span className="text-orange-500">Our Gym</span>
          </h2>

          <p className="text-gray-400 mt-6">
            We are dedicated to helping you achieve your fitness goals with
            expert trainers, modern equipment, and personalized workout plans.
            Our mission is to build a healthier and stronger community.
          </p>

          <p className="text-gray-400 mt-4">
            Whether you want to lose weight, gain muscle, or stay fit, we provide
            everything you need to transform your body and lifestyle.
          </p>

          {/* Features */}
          <div className="mt-6 space-y-3">
            <p className="flex items-center gap-2">
              <span className="text-orange-500">✔</span> Professional Trainers
            </p>
            <p className="flex items-center gap-2">
              <span className="text-orange-500">✔</span> Modern Equipment
            </p>
            <p className="flex items-center gap-2">
              <span className="text-orange-500">✔</span> Personalized Diet Plans
            </p>
          </div>

          {/* Button */}
          <button className="mt-8 bg-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
}