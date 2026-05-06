import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaPlus, FaEdit, FaTrash, FaSave, FaTimes,
  FaAppleAlt, FaFire, FaClock, FaUtensils,
} from "react-icons/fa";

export default function AdminDietPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "balanced",
    calories: "",
    duration: "",
    image: "",
    meals: [
      { name: "Breakfast", time: "7:00 AM", foods: "", calories: "" },
      { name: "Lunch", time: "1:00 PM", foods: "", calories: "" },
      { name: "Dinner", time: "7:00 PM", foods: "", calories: "" },
    ],
    tips: [""],
  });

  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get("http://localhost:5000/api/diet-plans/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlans(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPlans(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMealChange = (index, field, value) => {
    const newMeals = [...form.meals];
    newMeals[index][field] = value;
    setForm({ ...form, meals: newMeals });
  };

  const addMeal = () => {
    setForm({ ...form, meals: [...form.meals, { name: "", time: "", foods: "", calories: "" }] });
  };

  const removeMeal = (index) => {
    const newMeals = form.meals.filter((_, i) => i !== index);
    setForm({ ...form, meals: newMeals });
  };

  const handleTipChange = (index, value) => {
    const newTips = [...form.tips];
    newTips[index] = value;
    setForm({ ...form, tips: newTips });
  };

  const addTip = () => setForm({ ...form, tips: [...form.tips, ""] });
  const removeTip = (index) => setForm({ ...form, tips: form.tips.filter((_, i) => i !== index) });

  const resetForm = () => {
    setForm({
      title: "", description: "", category: "balanced", calories: "", duration: "", image: "",
      meals: [
        { name: "Breakfast", time: "7:00 AM", foods: "", calories: "" },
        { name: "Lunch", time: "1:00 PM", foods: "", calories: "" },
        { name: "Dinner", time: "7:00 PM", foods: "", calories: "" },
      ],
      tips: [""],
    });
    setEditMode(false);
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return toast.error("Title is required!");

    try {
      setSaving(true);
      const token = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${token}` };

      // Filter empty meals/tips
      const payload = {
        ...form,
        meals: form.meals.filter((m) => m.name || m.foods),
        tips: form.tips.filter((t) => t.trim()),
      };

      if (editMode) {
        await axios.put(`http://localhost:5000/api/diet-plans/${editId}`, payload, { headers });
        toast.success("Diet plan updated! ✅");
      } else {
        await axios.post("http://localhost:5000/api/diet-plans", payload, { headers });
        toast.success("Diet plan added! 🥗");
      }

      resetForm();
      fetchPlans();
    } catch (error) {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const editPlan = (plan) => {
    setForm({
      title: plan.title,
      description: plan.description || "",
      category: plan.category,
      calories: plan.calories || "",
      duration: plan.duration || "",
      image: plan.image || "",
      meals: plan.meals?.length ? plan.meals : [{ name: "", time: "", foods: "", calories: "" }],
      tips: plan.tips?.length ? plan.tips : [""],
    });
    setEditId(plan._id);
    setEditMode(true);
    setShowForm(true);
  };

  const deletePlan = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/diet-plans/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Diet plan deleted!");
      fetchPlans();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" toastClassName="bg-gray-900 text-white border border-gray-700" />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Diet <span className="text-orange-500">Plans</span></h2>
          <p className="text-gray-400 text-sm mt-1">{plans.length} plans total</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="px-5 py-3 bg-orange-500 rounded-full font-semibold text-white hover:bg-orange-600 transition-all flex items-center gap-2">
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? "Close" : "Add Diet Plan"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 mb-8">
          <h3 className="text-white text-xl font-bold mb-6">{editMode ? "Edit" : "Add New"} Diet Plan</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Title *</label>
                <input name="title" value={form.title} onChange={handleChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                  placeholder="Weight Loss Diet Plan" />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">Category</label>
                <select name="category" value={form.category} onChange={handleChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none">
                  <option value="weight-loss">Weight Loss</option>
                  <option value="muscle-gain">Muscle Gain</option>
                  <option value="keto">Keto</option>
                  <option value="balanced">Balanced</option>
                  <option value="diabetic">Diabetic</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">Total Calories</label>
                <input name="calories" value={form.calories} onChange={handleChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                  placeholder="1800 kcal" />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">Duration</label>
                <input name="duration" value={form.duration} onChange={handleChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                  placeholder="4 Weeks" />
              </div>
              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm block mb-2">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows="3"
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none resize-none" />
              </div>
            </div>

            {/* Meals Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-semibold"><FaUtensils className="inline mr-2 text-orange-500" />Meals</h4>
                <button type="button" onClick={addMeal}
                  className="text-orange-500 text-sm hover:text-orange-400">+ Add Meal</button>
              </div>
              {form.meals.map((meal, i) => (
                <div key={i} className="grid grid-cols-4 gap-3 mb-3 p-4 bg-black/50 rounded-lg border border-gray-800">
                  <input placeholder="Meal name" value={meal.name} onChange={(e) => handleMealChange(i, "name", e.target.value)}
                    className="p-2 bg-black border border-gray-700 rounded text-white text-sm outline-none focus:border-orange-500" />
                  <input placeholder="Time" value={meal.time} onChange={(e) => handleMealChange(i, "time", e.target.value)}
                    className="p-2 bg-black border border-gray-700 rounded text-white text-sm outline-none focus:border-orange-500" />
                  <input placeholder="Foods" value={meal.foods} onChange={(e) => handleMealChange(i, "foods", e.target.value)}
                    className="p-2 bg-black border border-gray-700 rounded text-white text-sm outline-none focus:border-orange-500" />
                  <div className="flex gap-2">
                    <input placeholder="Cal" value={meal.calories} onChange={(e) => handleMealChange(i, "calories", e.target.value)}
                      className="flex-1 p-2 bg-black border border-gray-700 rounded text-white text-sm outline-none focus:border-orange-500" />
                    {form.meals.length > 1 && (
                      <button type="button" onClick={() => removeMeal(i)} className="text-red-500 hover:text-red-400">✕</button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-semibold">💡 Tips</h4>
                <button type="button" onClick={addTip} className="text-orange-500 text-sm">+ Add Tip</button>
              </div>
              {form.tips.map((tip, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input value={tip} onChange={(e) => handleTipChange(i, e.target.value)}
                    className="flex-1 p-2 bg-black border border-gray-700 rounded text-white text-sm outline-none focus:border-orange-500"
                    placeholder="Drink 8 glasses of water daily" />
                  {form.tips.length > 1 && (
                    <button type="button" onClick={() => removeTip(i)} className="text-red-500">✕</button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={resetForm}
                className="flex-1 py-3 bg-gray-700 rounded-full font-semibold text-white hover:bg-gray-600">Cancel</button>
              <button type="submit" disabled={saving}
                className="flex-1 py-3 bg-orange-500 rounded-full font-semibold text-white hover:bg-orange-600 flex items-center justify-center gap-2">
                {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FaSave />}
                {editMode ? "Update" : "Add Diet Plan"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Plans Grid */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : plans.length === 0 ? (
        <div className="text-center py-16 bg-[#111] border border-gray-800 rounded-xl text-gray-500">
          <FaAppleAlt className="text-5xl mx-auto mb-3 opacity-50" />
          <p>No diet plans yet. Add your first plan!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan._id} className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden hover:border-orange-500 transition-all">
              <div className="p-5">
                <h3 className="text-white font-bold text-lg">{plan.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-gray-400 text-xs">
                  <span className="flex items-center gap-1"><FaFire /> {plan.calories || "N/A"}</span>
                  <span className="flex items-center gap-1"><FaClock /> {plan.duration || "N/A"}</span>
                  <span className="capitalize bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded-full">{plan.category}</span>
                </div>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{plan.description}</p>
                <p className="text-gray-500 text-xs mt-2">{plan.meals?.length || 0} meals</p>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => editPlan(plan)}
                    className="flex-1 py-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white text-sm">Edit</button>
                  <button onClick={() => deletePlan(plan._id, plan.title)}
                    className="flex-1 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white text-sm">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}