import { useEffect, useState } from "react";
import axios from "axios";
import { FaAppleAlt, FaFire, FaClock, FaUtensils, FaSearch } from "react-icons/fa";

export default function DietplanView() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [category, setCategory] = useState("all");

  useEffect(() => { fetchPlans(); }, []);

  const fetchPlans = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/diet-plans");
      setPlans(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlans = plans.filter((p) => category === "all" || p.category === category);

  const categories = ["all", "weight-loss", "muscle-gain", "keto", "balanced", "diabetic"];

  return (
    <div className="min-h-screen bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Diet <span className="text-orange-500">Plans</span>
          </h1>
          <p className="text-gray-400">Choose a diet plan that fits your goals</p>
        </div>

        {/* Selected Plan Detail */}
        {selectedPlan && (
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 mb-10">
            <button onClick={() => setSelectedPlan(null)}
              className="text-gray-400 hover:text-white mb-4">← Back to plans</button>
            <h2 className="text-3xl font-bold text-white">{selectedPlan.title}</h2>
            <p className="text-gray-400 mt-2">{selectedPlan.description}</p>
            <div className="flex gap-4 mt-4 text-sm">
              <span className="text-orange-500"><FaFire className="inline mr-1" />{selectedPlan.calories}</span>
              <span className="text-orange-500"><FaClock className="inline mr-1" />{selectedPlan.duration}</span>
            </div>

            {/* Meals */}
            <div className="mt-8">
              <h3 className="text-white font-bold text-xl mb-4"><FaUtensils className="inline mr-2 text-orange-500" />Meals</h3>
              <div className="space-y-4">
                {selectedPlan.meals?.map((meal, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-black/50 rounded-xl border border-gray-800">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">{i + 1}</div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">{meal.name} <span className="text-gray-500 text-sm">({meal.time})</span></p>
                      <p className="text-gray-400">{meal.foods}</p>
                    </div>
                    {meal.calories && <span className="text-orange-500 font-bold">{meal.calories} cal</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            {selectedPlan.tips?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-white font-bold text-xl mb-4">💡 Tips</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedPlan.tips.map((tip, i) => (
                    <div key={i} className="p-3 bg-black/50 rounded-lg text-gray-300 text-sm">• {tip}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
                category === cat ? "bg-orange-500 text-white" : "bg-[#111] text-gray-400 border border-gray-800 hover:border-orange-500"
              }`}>
              {cat.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Plans Grid */}
        {loading ? (
          <div className="text-center py-12"><div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" /></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <div key={plan._id} onClick={() => setSelectedPlan(plan)}
                className="bg-[#111] border border-gray-800 rounded-xl p-6 cursor-pointer hover:border-orange-500 transition-all group">
                <FaAppleAlt className="text-orange-500 text-4xl mb-4" />
                <h3 className="text-white font-bold text-lg group-hover:text-orange-500">{plan.title}</h3>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{plan.description}</p>
                <div className="flex gap-3 mt-4 text-xs text-gray-400">
                  <span><FaFire className="inline text-orange-500" /> {plan.calories}</span>
                  <span><FaClock className="inline text-orange-500" /> {plan.duration}</span>
                </div>
                <span className="inline-block mt-3 bg-orange-500/10 text-orange-500 text-xs px-2 py-1 rounded-full capitalize">{plan.category.replace("-", " ")}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}