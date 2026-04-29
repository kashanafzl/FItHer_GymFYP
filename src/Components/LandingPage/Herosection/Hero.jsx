import React, { useEffect, useState } from "react";

import img1 from "../../../Assets/1.jpg";
import img2 from "../../../Assets/2.jpg";
import img3 from "../../../Assets/3.jpg";
import img4 from "../../../Assets/4.jpg";

const images = [img1, img2, img3, img4];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* Slider */}
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <img
            src={img}
            alt={`slide-${i}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Clean Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Build Your{" "}
          <span className="text-orange-500">
            Dream Body
          </span>
        </h1>

        <p className="text-gray-400 mt-4 max-w-xl">
          Join the most advanced fitness platform with expert training and AI diet plans.
        </p>

        <div className="flex gap-4 mt-8">
          {/* Main Button */}
          <button className="bg-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
            Get Started
          </button>

          {/* Outline Button */}
          <button className="border border-orange-500 text-orange-500 px-6 py-3 rounded-full hover:bg-orange-500 hover:text-white transition">
            Learn More
          </button>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-10">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-orange-500" : "bg-gray-600"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}