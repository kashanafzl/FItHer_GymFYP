import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaDumbbell,
} from "react-icons/fa";

export default function AdminTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    image: "",
    bio: "",
    specializations: "",
    certifications: "",
  });

  const fetchTrainers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get("http://localhost:5000/api/trainers/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrainers(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load trainers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      role: "",
      experience: "",
      image: "",
      bio: "",
      specializations: "",
      certifications: "",
    });
    setEditMode(false);
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.role || !form.experience) {
      return toast.error("Please fill all required fields!");
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${token}` };

      const payload = {
        ...form,
        specializations: form.specializations
          ? form.specializations.split(",").map((s) => s.trim())
          : [],
        certifications: form.certifications
          ? form.certifications.split(",").map((s) => s.trim())
          : [],
      };

      if (editMode) {
        await axios.put(`http://localhost:5000/api/trainers/${editId}`, payload, { headers });
        toast.success("Trainer updated! ✅");
      } else {
        await axios.post("http://localhost:5000/api/trainers", payload, { headers });
        toast.success("Trainer added! 🎉");
      }

      resetForm();
      fetchTrainers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const editTrainer = (trainer) => {
    setForm({
      name: trainer.name,
      email: trainer.email,
      phone: trainer.phone,
      role: trainer.role,
      experience: trainer.experience,
      image: trainer.image || "",
      bio: trainer.bio || "",
      specializations: trainer.specializations?.join(", ") || "",
      certifications: trainer.certifications?.join(", ") || "",
    });
    setEditId(trainer._id);
    setEditMode(true);
    setShowForm(true);
  };

  const deleteTrainer = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone!`)) return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/trainers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Trainer deleted! 🗑️");
      fetchTrainers();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        toastClassName="bg-gray-900 text-white border border-gray-700"
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Trainers <span className="text-orange-500">Management</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {trainers.length} trainers total
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="px-5 py-3 bg-orange-500 rounded-full font-semibold text-white hover:bg-orange-600 transition-all flex items-center gap-2"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? "Close" : "Add Trainer"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 mb-8">
          <h3 className="text-white text-xl font-bold mb-6">
            {editMode ? "Edit Trainer" : "Add New Trainer"}
          </h3>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-gray-400 text-sm block mb-2">Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-2">Email *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                placeholder="john@fitxgym.com"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-2">Phone *</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                placeholder="+92 300 1234567"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-2">Role *</label>
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                placeholder="Strength Coach"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-2">Experience *</label>
              <input
                name="experience"
                value={form.experience}
                onChange={handleChange}
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                placeholder="8 Years Experience"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-2">Image URL</label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-400 text-sm block mb-2">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none resize-none"
                placeholder="Short bio about the trainer..."
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-2">
                Specializations (comma separated)
              </label>
              <input
                name="specializations"
                value={form.specializations}
                onChange={handleChange}
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                placeholder="Weight Loss, HIIT, Cardio"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-2">
                Certifications (comma separated)
              </label>
              <input
                name="certifications"
                value={form.certifications}
                onChange={handleChange}
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                placeholder="ACE, NASM, ISSA"
              />
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 py-3 bg-gray-700 rounded-full font-semibold text-white hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-3 bg-orange-500 rounded-full font-semibold text-white hover:bg-orange-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaSave />
                )}
                {editMode ? "Update Trainer" : "Add Trainer"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Trainers Grid */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : trainers.length === 0 ? (
        <div className="text-center py-16 bg-[#111] border border-gray-800 rounded-xl text-gray-500">
          <FaDumbbell className="text-5xl mx-auto mb-3 opacity-50" />
          <p>No trainers found. Add your first trainer!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <div
              key={trainer._id}
              className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden hover:border-orange-500 transition-all group"
            >
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                {trainer.image ? (
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <FaDumbbell className="text-gray-700 text-6xl" />
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-white font-bold text-lg">{trainer.name}</h3>
                <p className="text-orange-500 text-sm font-semibold">{trainer.role}</p>
                <p className="text-gray-500 text-sm">{trainer.experience}</p>

                <div className="flex items-center gap-3 mt-3 text-gray-400 text-sm">
                  <span className="flex items-center gap-1">
                    <FaEnvelope className="text-xs" /> {trainer.email}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-1 text-gray-400 text-sm">
                  <span className="flex items-center gap-1">
                    <FaPhone className="text-xs" /> {trainer.phone}
                  </span>
                </div>

                {/* Specializations */}
                {trainer.specializations?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {trainer.specializations.map((spec, i) => (
                      <span
                        key={i}
                        className="bg-orange-500/10 text-orange-500 text-xs px-2 py-1 rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-800">
                  <button
                    onClick={() => editTrainer(trainer)}
                    className="flex-1 py-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-1 text-sm"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => deleteTrainer(trainer._id, trainer.name)}
                    className="flex-1 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-1 text-sm"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}