import React from "react";

export default function Strength() {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* HERO */}
      <section className="h-[60vh] flex items-center justify-center text-center px-6 border-b border-gray-800">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold">
            Strength <span className="text-orange-500">Training</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Build muscle, increase power and transform your body with expert training programs.
          </p>
        </div>
      </section>

      {/* WORKOUT VIDEOS */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center">
          Workout <span className="text-orange-500">Videos</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-10">

          <iframe
            className="w-full h-56 rounded-lg"
            src="https://www.youtube.com/embed/UBMk30rjy0o"
            title="Chest Workout"
            allowFullScreen
          ></iframe>

          <iframe
            className="w-full h-56 rounded-lg"
            src="https://www.youtube.com/embed/eozdVDA78K0"
            title="Back Workout"
            allowFullScreen
          ></iframe>

          <iframe
            className="w-full h-56 rounded-lg"
            src="https://www.youtube.com/embed/2tM1LFFxeKg"
            title="Leg Workout"
            allowFullScreen
          ></iframe>

        </div>
      </section>

      {/* WORKOUT PLAN */}
      <section className="py-16 px-6 bg-black border-t border-gray-800">
        <h2 className="text-3xl font-bold text-center">
          Weekly <span className="text-orange-500">Plan</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">

          {[
            { day: "Monday", workout: "Chest & Triceps" },
            { day: "Tuesday", workout: "Back & Biceps" },
            { day: "Wednesday", workout: "Rest / Cardio" },
            { day: "Thursday", workout: "Shoulders" },
            { day: "Friday", workout: "Leg Day" },
            { day: "Saturday", workout: "Full Body" },
          ].map((item, i) => (
            <div
              key={i}
              className="border border-gray-800 p-5 rounded-xl text-center hover:border-orange-500 transition"
            >
              <h3 className="text-lg font-semibold">{item.day}</h3>
              <p className="text-gray-400 mt-2">{item.workout}</p>
            </div>
          ))}

        </div>
      </section>

      {/* PROGRESS TRACK */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold">
          Track Your <span className="text-orange-500">Progress</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="border border-gray-800 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-orange-500">+5kg</h3>
            <p className="text-gray-400">Muscle Gain</p>
          </div>

          <div className="border border-gray-800 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-orange-500">-3kg</h3>
            <p className="text-gray-400">Fat Loss</p>
          </div>

          <div className="border border-gray-800 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-orange-500">30 Days</h3>
            <p className="text-gray-400">Consistency</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center border-t border-gray-800">
        <h2 className="text-3xl font-bold">
          Ready to Start Your <span className="text-orange-500">Journey?</span>
        </h2>

        <button className="mt-6 bg-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
          Start Training
        </button>
      </section>

    </div>
  );
}