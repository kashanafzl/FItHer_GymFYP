import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import {
  FaWeight,
  FaFire,
  FaClock,
  FaDumbbell,
  FaPlus,
  FaTrash,
  FaTint,
  FaTimes,
  FaSave,
} from "react-icons/fa";

export default function Progress() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    weight: "",
    calories: "",
    workoutMinutes: "",
    exercises: "",
    waterIntake: "",
    protein: "",
    note: "",
  });

  // Fetch logs & stats
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      // ✅ Token validation
      if (!token) {
        toast.error("Please login to view progress");
        setLoading(false);
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      const [logsRes, statsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/progress", { headers }),
        axios.get("http://localhost:5000/api/progress/stats", { headers }),
      ]);

      setLogs(logsRes.data || []);
      setStats(statsRes.data || null);
      console.log("📊 Progress data loaded:", logsRes.data.length, "logs");
    } catch (error) {
      console.error("Fetch error:", error.response?.data || error.message);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Failed to load progress data");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add log
  const addLog = async () => {
    // Validation
    if (!form.weight) {
      return toast.error("Weight is required!");
    }

    if (!form.date) {
      return toast.error("Date is required!");
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again");
        return;
      }

      const payload = {
        date: form.date,
        weight: Number(form.weight),
        calories: Number(form.calories) || 0,
        workoutMinutes: Number(form.workoutMinutes) || 0,
        exercises: Number(form.exercises) || 0,
        waterIntake: Number(form.waterIntake) || 0,
        protein: Number(form.protein) || 0,
        note: form.note || "",
      };

      await axios.post("http://localhost:5000/api/progress", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Progress saved! 💪");
      setShowForm(false);
      
      // Reset form
      setForm({
        date: new Date().toISOString().split("T")[0],
        weight: "",
        calories: "",
        workoutMinutes: "",
        exercises: "",
        waterIntake: "",
        protein: "",
        note: "",
      });

      // Refresh data
      fetchData();
    } catch (error) {
      console.error("Save error:", error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(error.response?.data?.message || "Failed to save progress");
      }
    } finally {
      setSaving(false);
    }
  };

  // Delete log
  const deleteLog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this log?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again");
        return;
      }

      await axios.delete(`http://localhost:5000/api/progress/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Log deleted successfully! 🗑️");
      fetchData();
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Failed to delete log");
      }
    }
  };

  // Chart data format
  const chartData = logs.map((log) => ({
    date: new Date(log.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    weight: log.weight,
    calories: log.calories,
    workout: log.workoutMinutes,
    protein: log.protein,
  }));

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        toastClassName="bg-gray-900 text-white border border-gray-700"
        autoClose={3000}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Progress <span className="text-orange-500">Tracker</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Track your fitness journey
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-3 bg-orange-500 rounded-full font-semibold text-white hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? "Close" : "Add Log"}
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#111] border border-gray-800 rounded-xl p-4 hover:border-orange-500 transition-all">
            <FaWeight className="text-orange-500 text-xl mb-2" />
            <p className="text-gray-400 text-xs">Current Weight</p>
            <h3 className="text-white text-2xl font-bold">
              {stats.currentWeight || "--"}
              <span className="text-sm text-gray-500"> kg</span>
            </h3>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-xl p-4 hover:border-orange-500 transition-all">
            <FaFire className="text-orange-500 text-xl mb-2" />
            <p className="text-gray-400 text-xs">Weight Change</p>
            <h3
              className={`text-2xl font-bold ${
                stats.totalWeightLost > 0
                  ? "text-green-500"
                  : stats.totalWeightLost < 0
                  ? "text-red-500"
                  : "text-white"
              }`}
            >
              {stats.totalWeightLost > 0 ? "-" : "+"}
              {Math.abs(stats.totalWeightLost || 0)}
              <span className="text-sm"> kg</span>
            </h3>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-xl p-4 hover:border-orange-500 transition-all">
            <FaDumbbell className="text-orange-500 text-xl mb-2" />
            <p className="text-gray-400 text-xs">Total Workouts</p>
            <h3 className="text-white text-2xl font-bold">
              {stats.totalWorkouts || 0}
            </h3>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-xl p-4 hover:border-orange-500 transition-all">
            <FaClock className="text-orange-500 text-xl mb-2" />
            <p className="text-gray-400 text-xs">Day Streak</p>
            <h3 className="text-white text-2xl font-bold">
              {stats.streak || 0} 🔥
            </h3>
          </div>
        </div>
      )}

      {/* CHARTS SECTION */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Weight Trend */}
        <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <FaWeight className="text-orange-500" />
            Weight Trend
          </h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ fill: "#f97316", r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <FaWeight className="text-4xl mx-auto mb-3 opacity-30" />
              <p>No weight data yet</p>
            </div>
          )}
        </div>

        {/* Calories */}
        <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <FaFire className="text-orange-500" />
            Daily Calories
          </h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="calories" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <FaFire className="text-4xl mx-auto mb-3 opacity-30" />
              <p>No calorie data yet</p>
            </div>
          )}
        </div>

        {/* Workout Minutes */}
        <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <FaClock className="text-orange-500" />
            Workout Minutes
          </h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="workout"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <FaClock className="text-4xl mx-auto mb-3 opacity-30" />
              <p>No workout data yet</p>
            </div>
          )}
        </div>

        {/* Protein Intake */}
        <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            🥩 Protein Intake
          </h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="protein"
                  stroke="#a855f7"
                  strokeWidth={3}
                  dot={{ fill: "#a855f7", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <span className="text-4xl block mb-3 opacity-30">🥩</span>
              <p>No protein data yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Log Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Add Daily Log</h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">
                  Weight (kg) <span className="text-orange-500">*</span>
                </label>
                <input
                  type="number"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                  placeholder="70"
                  step="0.1"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Calories</label>
                <input
                  type="number"
                  name="calories"
                  value={form.calories}
                  onChange={handleChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                  placeholder="2000"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Workout (min)</label>
                <input
                  type="number"
                  name="workoutMinutes"
                  value={form.workoutMinutes}
                  onChange={handleChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                  placeholder="45"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Exercises</label>
                <input
                  type="number"
                  name="exercises"
                  value={form.exercises}
                  onChange={handleChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                  placeholder="6"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">
                  <FaTint className="inline mr-1" /> Water (glasses)
                </label>
                <input
                  type="number"
                  name="waterIntake"
                  value={form.waterIntake}
                  onChange={handleChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                  placeholder="8"
                />
              </div>

              <div className="col-span-2">
                <label className="text-gray-400 text-sm block mb-2">Protein (g)</label>
                <input
                  type="number"
                  name="protein"
                  value={form.protein}
                  onChange={handleChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                  placeholder="150"
                />
              </div>

              <div className="col-span-2">
                <label className="text-gray-400 text-sm block mb-2">Note</label>
                <textarea
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none resize-none"
                  rows="2"
                  placeholder="Feeling great today!"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 bg-gray-700 rounded-full font-semibold text-white hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={addLog}
                disabled={saving}
                className="flex-1 py-3 bg-orange-500 rounded-full font-semibold text-white hover:bg-orange-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Save Log
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Logs Table */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">
          Recent Logs ({logs.length})
        </h3>

        {logs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <span className="text-5xl">📊</span>
            <p className="mt-3">No logs yet. Start tracking your progress!</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-all"
            >
              Add Your First Log
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-sm">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Weight</th>
                  <th className="pb-3">Calories</th>
                  <th className="pb-3">Workout</th>
                  <th className="pb-3">Protein</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {logs.slice(0, 10).map((log) => (
                  <tr
                    key={log._id}
                    className="border-b border-gray-800/50 hover:bg-gray-900/50 transition-colors"
                  >
                    <td className="py-3 text-white text-sm">
                      {new Date(log.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-3">
                      <span className="text-orange-500 font-bold">
                        {log.weight}
                      </span>
                      <span className="text-gray-500 text-sm"> kg</span>
                    </td>
                    <td className="py-3 text-white">{log.calories || "-"}</td>
                    <td className="py-3 text-white">
                      {log.workoutMinutes ? `${log.workoutMinutes} min` : "-"}
                    </td>
                    <td className="py-3 text-purple-400">
                      {log.protein ? `${log.protein}g` : "-"}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => deleteLog(log._id)}
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-all"
                        title="Delete log"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}