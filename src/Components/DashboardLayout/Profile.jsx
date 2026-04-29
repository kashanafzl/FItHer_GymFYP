import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaEnvelope,
  FaWeight,
  FaRulerVertical,
  FaBullseye,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSave,
  FaEdit,
  FaTimes,
} from "react-icons/fa";

const API_BASE = "http://localhost:5000/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    weight: "",
    height: "",
    goal: "",
    phone: "",
    address: "",
  });

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        setLoading(false);
        return;
      }

      const { data } = await axios.get(`${API_BASE}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(data);
      setForm({
        name: data.name || "",
        email: data.email || "",
        age: data.age || "",
        weight: data.weight || "",
        height: data.height || "",
        goal: data.goal || "",
        phone: data.phone || "",
        address: data.address || "",
      });
    } catch (error) {
      console.error("Fetch error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Update profile
  const updateProfile = async () => {
    // Validation
    if (!form.name?.trim()) {
      return toast.error("Name is required!");
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again");
        return;
      }

      const { data } = await axios.put(
        `${API_BASE}/profile`,
        {
          name: form.name,
          age: form.age ? Number(form.age) : null,
          weight: form.weight ? Number(form.weight) : null,
          height: form.height ? Number(form.height) : null,
          goal: form.goal || null,
          phone: form.phone,
          address: form.address,
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      // Success
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Profile updated successfully! 🎉");
      setEditMode(false);
      
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Update failed! Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    // Reset form to original user data
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      age: user?.age || "",
      weight: user?.weight || "",
      height: user?.height || "",
      goal: user?.goal || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
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
        <h2 className="text-3xl font-bold text-white">
          My <span className="text-orange-500">Profile</span>
        </h2>
        <button
          onClick={editMode ? cancelEdit : () => setEditMode(true)}
          className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
            editMode
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20"
          }`}
        >
          {editMode ? (
            <>
              <FaTimes /> Cancel
            </>
          ) : (
            <>
              <FaEdit /> Edit Profile
            </>
          )}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Avatar & Basic Info Card */}
        <div className="md:col-span-1">
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6 text-center sticky top-24">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-4xl font-bold shadow-lg shadow-orange-500/20">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <h3 className="text-white text-xl font-bold">{user?.name}</h3>
            <p className="text-gray-400 text-sm mb-4 capitalize">
              {user?.goal || "Member"}
            </p>

            <div className="border-t border-gray-800 pt-4 space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <FaEnvelope className="text-orange-500 flex-shrink-0" />
                <span className="text-sm truncate">{user?.email}</span>
              </div>
              {user?.phone && (
                <div className="flex items-center gap-3 text-gray-400">
                  <FaPhone className="text-orange-500 flex-shrink-0" />
                  <span className="text-sm">{user.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-gray-400">
                <FaCalendarAlt className="text-orange-500 flex-shrink-0" />
                <span className="text-sm">
                  Joined:{" "}
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details Card */}
        <div className="md:col-span-2">
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white text-lg font-semibold mb-6">
              Personal Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">
                  <FaUser className="inline mr-2 text-orange-500" />
                  Full Name
                </label>
                {editMode ? (
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none transition-all"
                    placeholder="Enter your name"
                  />
                ) : (
                  <p className="text-white font-semibold py-2">
                    {user?.name || "Not set"}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">
                  <FaEnvelope className="inline mr-2 text-orange-500" />
                  Email
                </label>
                <p className="text-white font-semibold py-2">
                  {user?.email || "Not set"}
                </p>
              </div>

              {/* Age */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">
                  🎂 Age
                </label>
                {editMode ? (
                  <input
                    name="age"
                    type="number"
                    value={form.age}
                    onChange={handleChange}
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none transition-all"
                    placeholder="25"
                    min="10"
                    max="100"
                  />
                ) : (
                  <p className="text-white font-semibold py-2">
                    {user?.age ? `${user.age} years` : "Not set"}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">
                  <FaPhone className="inline mr-2 text-orange-500" />
                  Phone
                </label>
                {editMode ? (
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none transition-all"
                    placeholder="+92 300 1234567"
                  />
                ) : (
                  <p className="text-white font-semibold py-2">
                    {user?.phone || "Not set"}
                  </p>
                )}
              </div>

              {/* Weight */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">
                  <FaWeight className="inline mr-2 text-orange-500" />
                  Weight (kg)
                </label>
                {editMode ? (
                  <input
                    name="weight"
                    type="number"
                    value={form.weight}
                    onChange={handleChange}
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none transition-all"
                    placeholder="70"
                    step="0.1"
                    min="30"
                    max="300"
                  />
                ) : (
                  <p className="text-white font-semibold py-2">
                    {user?.weight ? `${user.weight} kg` : "Not set"}
                  </p>
                )}
              </div>

              {/* Height */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">
                  <FaRulerVertical className="inline mr-2 text-orange-500" />
                  Height (cm)
                </label>
                {editMode ? (
                  <input
                    name="height"
                    type="number"
                    value={form.height}
                    onChange={handleChange}
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none transition-all"
                    placeholder="175"
                    step="0.1"
                    min="100"
                    max="250"
                  />
                ) : (
                  <p className="text-white font-semibold py-2">
                    {user?.height ? `${user.height} cm` : "Not set"}
                  </p>
                )}
              </div>

              {/* Goal */}
              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm block mb-2">
                  <FaBullseye className="inline mr-2 text-orange-500" />
                  Fitness Goal
                </label>
                {editMode ? (
                  <select
                    name="goal"
                    value={form.goal}
                    onChange={handleChange}
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none transition-all cursor-pointer"
                  >
                    <option value="">-- Select Your Goal --</option>
                    <option value="Lose Weight">🔥 Lose Weight</option>
                    <option value="Build Muscle">💪 Build Muscle</option>
                    <option value="Stay Fit">🏃 Stay Fit</option>
                    <option value="Strength">🏋️ Strength</option>
                  </select>
                ) : (
                  <p className="text-white font-semibold py-2">
                    {user?.goal || "Not set"}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm block mb-2">
                  <FaMapMarkerAlt className="inline mr-2 text-orange-500" />
                  Address
                </label>
                {editMode ? (
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none transition-all resize-none"
                    placeholder="Enter your address"
                  />
                ) : (
                  <p className="text-white font-semibold py-2">
                    {user?.address || "Not set"}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {editMode && (
              <div className="flex gap-3 mt-6">
                <button
                  onClick={cancelEdit}
                  className="flex-1 py-3 bg-gray-700 rounded-full font-semibold text-white hover:bg-gray-600 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={updateProfile}
                  disabled={saving}
                  className="flex-1 py-3 bg-orange-500 rounded-full font-semibold text-white hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-[#111] border border-gray-800 rounded-xl p-4 text-center hover:border-orange-500 transition-all cursor-default">
              <p className="text-gray-400 text-xs mb-1">BMI</p>
              <h4 className="text-orange-500 font-bold text-lg">
                {user?.weight && user?.height
                  ? (user.weight / ((user.height / 100) ** 2)).toFixed(1)
                  : "--"}
              </h4>
              <p className="text-gray-500 text-xs mt-1">
                {user?.weight && user?.height
                  ? user.weight / ((user.height / 100) ** 2) < 18.5
                    ? "Underweight"
                    : user.weight / ((user.height / 100) ** 2) < 25
                    ? "Normal"
                    : user.weight / ((user.height / 100) ** 2) < 30
                    ? "Overweight"
                    : "Obese"
                  : ""}
              </p>
            </div>
            <div className="bg-[#111] border border-gray-800 rounded-xl p-4 text-center hover:border-orange-500 transition-all cursor-default">
              <p className="text-gray-400 text-xs mb-1">Goal</p>
              <h4 className="text-orange-500 font-bold text-sm capitalize">
                {user?.goal || "--"}
              </h4>
            </div>
            <div className="bg-[#111] border border-gray-800 rounded-xl p-4 text-center hover:border-orange-500 transition-all cursor-default">
              <p className="text-gray-400 text-xs mb-1">Member Since</p>
              <h4 className="text-orange-500 font-bold text-sm">
                {user?.createdAt
                  ? new Date(user.createdAt).getFullYear()
                  : "--"}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}