import React, { useState } from "react";
import axios from "axios";
import {
  FaMagic,
  FaFire,
  FaClock,
  FaUtensils,
  FaTint,
  FaBan,
  FaLightbulb,
  FaDownload,
  FaRedo,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AIDietGenerator() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    gender: "female",
    goal: "weight-loss",
    activityLevel: "moderate",
    restrictions: "",
  });

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const generatePlan = async () => {
    if (!form.age || !form.weight || !form.height) {
      return toast.error("Age, weight aur height must be!");
    }

    setLoading(true);
    setPlan(null);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/ai/diet-plan",
        form
      );
      setPlan(data);
      toast.success("AI Create the Diet Plan! 🎉");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate plan");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPlan(null);
    setForm({
      name: "",
      age: "",
      weight: "",
      height: "",
      gender: "female",
      goal: "weight-loss",
      activityLevel: "moderate",
      restrictions: "",
    });
  };

  const downloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-black py-24 px-4">
      <ToastContainer position="top-right" theme="dark" />

      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-block bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-4">
            <span className="text-orange-500 text-sm font-semibold">
              🤖 Powered by AI
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            AI <span className="text-orange-500">Diet Generator</span>
          </h1>
          <p className="text-gray-400 mt-3">
            Apni info dein aur seconds mein personalized diet plan hasil karein
          </p>
        </div>

        {/* FORM */}
        {!plan && (
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm block mb-2">
                 Your Name (optional)
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g., Your Name"
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-500 transition"
                />
              </div>

              {/* Age */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">
                  Age (years) *
                </label>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="e.g., 25"
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-500 transition"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-500"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>

              {/* Weight */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">
                  Weight (kg) *
                </label>
                <input
                  type="number"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  placeholder="e.g., 65"
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-500 transition"
                />
              </div>

              {/* Height */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">
                  Height (cm) *
                </label>
                <input
                  type="number"
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                  placeholder="e.g., 165"
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-500 transition"
                />
              </div>

              {/* Goal */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">
                  Aapka Goal
                </label>
                <select
                  name="goal"
                  value={form.goal}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-500"
                >
                  <option value="weight-loss">Weight Loss (Wazan kam karna)</option>
                  <option value="muscle-gain">Muscle Gain (Muscle banana)</option>
                  <option value="balanced">Maintain (Maintain karna)</option>
                  <option value="keto">Keto Diet</option>
                  <option value="diabetic">Diabetic-Friendly</option>
                </select>
              </div>

              {/* Activity Level */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">
                  Activity Level
                </label>
                <select
                  name="activityLevel"
                  value={form.activityLevel}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-500"
                >
                  <option value="sedentary">Sedentary (No exercise)</option>
                  <option value="light">Light (1-2 days/week)</option>
                  <option value="moderate">Moderate (3-4 days/week)</option>
                  <option value="active">Active (5-6 days/week)</option>
                  <option value="very-active">Very Active (Daily)</option>
                </select>
              </div>

              {/* Restrictions */}
              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm block mb-2">
                  Food Restrictions (optional)
                </label>
                <input
                  type="text"
                  name="restrictions"
                  value={form.restrictions}
                  onChange={handleChange}
                  placeholder="e.g., no dairy, vegetarian, no nuts"
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-500 transition"
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={generatePlan}
              disabled={loading}
              className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]"
            >
              <FaMagic />
              {loading ? "AI creating... 🤔" : "Generate My Diet Plan"}
            </button>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="text-center py-10">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-400 mt-4">
              AI aapke liye personalized plan bana raha hai...
            </p>
          </div>
        )}

        {/* RESULT */}
        {plan && (
          <div
            id="diet-plan-result"
            className="bg-[#111] border border-orange-500/30 rounded-2xl p-8 animate-fadeIn"
          >
            {/* Title + Buttons */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {plan.title}
                </h2>
                <p className="text-gray-400 mt-2">{plan.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={downloadPDF}
                  className="bg-orange-500/10 border border-orange-500/30 text-orange-500 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-orange-500 hover:text-white transition"
                >
                  <FaDownload /> Save
                </button>
                <button
                  onClick={resetForm}
                  className="bg-gray-800 border border-gray-700 text-gray-300 px-4 py-2 rounded-full flex items-center gap-2 hover:border-orange-500 hover:text-orange-500 transition"
                >
                  <FaRedo /> New
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              <div className="bg-black/50 border border-gray-800 rounded-xl p-4 text-center">
                <FaFire className="text-orange-500 mx-auto mb-2" />
                <p className="text-gray-500 text-xs">Calories</p>
                <p className="text-white font-bold">{plan.calories}</p>
              </div>
              <div className="bg-black/50 border border-gray-800 rounded-xl p-4 text-center">
                <FaClock className="text-orange-500 mx-auto mb-2" />
                <p className="text-gray-500 text-xs">Duration</p>
                <p className="text-white font-bold">{plan.duration}</p>
              </div>
              <div className="bg-black/50 border border-gray-800 rounded-xl p-4 text-center">
                <span className="text-orange-500 font-bold text-xl">BMI</span>
                <p className="text-gray-500 text-xs mt-1">Your BMI</p>
                <p className="text-white font-bold">{plan.bmi}</p>
              </div>
              <div className="bg-black/50 border border-gray-800 rounded-xl p-4 text-center">
                <FaTint className="text-orange-500 mx-auto mb-2" />
                <p className="text-gray-500 text-xs">Water</p>
                <p className="text-white font-bold">{plan.waterIntake}</p>
              </div>
            </div>

            {/* Meals */}
            <div className="mt-8">
              <h3 className="text-white font-bold text-xl mb-4">
                <FaUtensils className="inline mr-2 text-orange-500" />
                Aapke Meals
              </h3>
              <div className="space-y-3">
                {plan.meals?.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 bg-black/50 rounded-xl border border-gray-800 hover:border-orange-500/50 transition"
                  >
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">
                        {m.name}{" "}
                        <span className="text-gray-500 text-sm font-normal">
                          ({m.time})
                        </span>
                      </p>
                      <p className="text-gray-400 text-sm mt-1">{m.foods}</p>
                    </div>
                    <span className="text-orange-500 font-bold text-sm flex-shrink-0">
                      {m.calories} cal
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            {plan.tips?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-white font-bold text-xl mb-4">
                  <FaLightbulb className="inline mr-2 text-orange-500" />
                  AI Tips
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {plan.tips.map((tip, i) => (
                    <div
                      key={i}
                      className="p-3 bg-black/50 rounded-lg text-gray-300 text-sm border border-gray-800"
                    >
                      💡 {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Foods to Avoid */}
            {plan.avoid?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-white font-bold text-xl mb-4">
                  <FaBan className="inline mr-2 text-red-500" />
                Not use
                </h3>
                <div className="flex flex-wrap gap-2">
                  {plan.avoid.map((item, i) => (
                    <span
                      key={i}
                      className="bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-1 rounded-full text-sm"
                    >
                      ❌ {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-gray-500 text-xs text-center mt-8 pt-6 border-t border-gray-800">
              ⚠️  AI-generated plan.
            </p>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #diet-plan-result, #diet-plan-result * { visibility: visible; }
          #diet-plan-result {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
          }
          #diet-plan-result button { display: none !important; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </div>
  );
}