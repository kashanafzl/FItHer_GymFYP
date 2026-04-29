import { useState, useEffect } from "react";
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

import member1 from "../../../Assets/1.jpg";
import member2 from "../../../Assets/2.jpg";
import member3 from "../../../Assets/3.jpg";
import member4 from "../../../Assets/4.jpg";
import member5 from "../../../Assets/5.jpg";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const reviews = [
    {
      id: 1,
      name: "Usman Zafar",
      role: "Member since 2024",
      rating: 5,
      text: "Best gym in the city! The trainers are incredibly knowledgeable and the equipment is top-notch. Lost 20kg in just 6 months!",
      image: member1,
      achievement: "Lost 20kg",
    },
    {
      id: 2,
      name: "Ayesha Iqbal",
      role: "Member since 2023",
      rating: 5,
      text: "Love the group classes and friendly atmosphere. The nutrition plan was customized perfectly according to my needs.",
      image: member2,
      achievement: "Lost 18kg",
    },
    {
      id: 3,
      name: "Hassan Raza",
      role: "Member since 2024",
      rating: 5,
      text: "24/7 access is a game-changer for my busy schedule. The gym is always clean and staff is very supportive.",
      image: member3,
      achievement: "Gained 12kg",
    },
    {
      id: 4,
      name: "Fatima Khan",
      role: "Member since 2023",
      rating: 5,
      text: "The personal trainers are amazing! They created a workout plan that perfectly matched my goals.",
      image: member4,
      achievement: "Lost 15kg",
    },
    {
      id: 5,
      name: "Ali Hassan",
      role: "Member since 2024",
      rating: 4,
      text: "Amazing atmosphere and great community! The group classes keep me motivated every single day!",
      image: member5,
      achievement: "Body Transformed",
    },
  ];

  // Auto-slide with cleanup
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, reviews.length]);

  const goTo = (index) => {
    setCurrent(index);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="text-orange-500">Members Say</span>
          </h2>
          <p className="text-gray-400">
            Real reviews from real people who transformed their lives
          </p>
        </div>

        {/* Slider Container */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Slides Track */}
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className="w-full flex-shrink-0 px-4"
              >
                <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 md:p-10 max-w-2xl mx-auto">
                  
                  {/* Quote */}
                  <FaQuoteRight className="text-orange-500 text-4xl mb-6 opacity-30" />

                  {/* Stars */}
                  <div className="flex gap-1.5 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-lg ${
                          i < review.rating ? "text-yellow-500" : "text-gray-700"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
                    "{review.text}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-800">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-700 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-bold">{review.name}</h4>
                      <p className="text-gray-500 text-sm">{review.role}</p>
                    </div>
                    <span className="bg-orange-500/10 text-orange-500 text-xs px-3 py-1.5 rounded-full border border-orange-500/20 whitespace-nowrap">
                      🏆 {review.achievement}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={prev}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#111] border border-gray-700 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 z-10 shadow-lg"
          >
            <FaChevronLeft className="text-lg" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={next}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#111] border border-gray-700 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 z-10 shadow-lg"
          >
            <FaChevronRight className="text-lg" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === current
                  ? "bg-orange-500 w-7 h-2.5"
                  : "bg-gray-700 w-2.5 h-2.5 hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}