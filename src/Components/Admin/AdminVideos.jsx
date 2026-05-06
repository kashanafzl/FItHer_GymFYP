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
  FaVideo,
  FaYoutube,
  FaClock,
  FaUser,
  FaEye,
} from "react-icons/fa";

export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnail: "",
    category: "other",
    duration: "",
    trainer: "",
  });

  const fetchVideos = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get("http://localhost:5000/api/videos/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ title: "", description: "", videoUrl: "", thumbnail: "", category: "other", duration: "", trainer: "" });
    setEditMode(false);
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.videoUrl) {
      return toast.error("Title and Video URL are required!");
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${token}` };

      if (editMode) {
        await axios.put(`http://localhost:5000/api/videos/${editId}`, form, { headers });
        toast.success("Video updated! ✅");
      } else {
        await axios.post("http://localhost:5000/api/videos", form, { headers });
        toast.success("Video added! 🎥");
      }

      resetForm();
      fetchVideos();
    } catch (error) {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const editVideo = (video) => {
    setForm({
      title: video.title,
      description: video.description || "",
      videoUrl: video.videoUrl,
      thumbnail: video.thumbnail || "",
      category: video.category,
      duration: video.duration || "",
      trainer: video.trainer || "",
    });
    setEditId(video._id);
    setEditMode(true);
    setShowForm(true);
  };

  const deleteVideo = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/videos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Video deleted!");
      fetchVideos();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" toastClassName="bg-gray-900 text-white border border-gray-700" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Video <span className="text-orange-500">Workouts</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">{videos.length} videos total</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="px-5 py-3 bg-orange-500 rounded-full font-semibold text-white hover:bg-orange-600 transition-all flex items-center gap-2"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? "Close" : "Add Video"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 mb-8">
          <h3 className="text-white text-xl font-bold mb-6">
            {editMode ? "Edit Video" : "Add New Video"}
          </h3>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-gray-400 text-sm block mb-2">Title *</label>
              <input name="title" value={form.title} onChange={handleChange}
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                placeholder="Full Body Workout" />
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-2">YouTube URL *</label>
              <input name="videoUrl" value={form.videoUrl} onChange={handleChange}
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                placeholder="https://youtube.com/watch?v=..." />
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-2">Thumbnail URL</label>
              <input name="thumbnail" value={form.thumbnail} onChange={handleChange}
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                placeholder="https://img.youtube.com/..." />
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-2">Category</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none">
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
                <option value="yoga">Yoga</option>
                <option value="hiit">HIIT</option>
                <option value="stretching">Stretching</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-2">Duration</label>
              <input name="duration" value={form.duration} onChange={handleChange}
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                placeholder="30 min" />
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-2">Trainer</label>
              <input name="trainer" value={form.trainer} onChange={handleChange}
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                placeholder="John Smith" />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-400 text-sm block mb-2">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows="3"
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none resize-none"
                placeholder="Describe this workout..." />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="button" onClick={resetForm}
                className="flex-1 py-3 bg-gray-700 rounded-full font-semibold text-white hover:bg-gray-600 transition-all">Cancel</button>
              <button type="submit" disabled={saving}
                className="flex-1 py-3 bg-orange-500 rounded-full font-semibold text-white hover:bg-orange-600 transition-all flex items-center justify-center gap-2">
                {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FaSave />}
                {editMode ? "Update" : "Add Video"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Videos Grid */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : videos.length === 0 ? (
        <div className="text-center py-16 bg-[#111] border border-gray-800 rounded-xl text-gray-500">
          <FaVideo className="text-5xl mx-auto mb-3 opacity-50" />
          <p>No videos yet. Add your first workout video!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video._id} className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden hover:border-orange-500 transition-all">
              {/* Thumbnail */}
              <div className="relative h-48 bg-gray-900 flex items-center justify-center">
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                ) : (
                  <FaYoutube className="text-red-500 text-6xl" />
                )}
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration || "Video"}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-white font-bold truncate">{video.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-gray-400 text-xs">
                  <span className="flex items-center gap-1"><FaUser /> {video.trainer || "N/A"}</span>
                  <span className="flex items-center gap-1"><FaClock /> {video.duration || "N/A"}</span>
                  <span className="flex items-center gap-1"><FaEye /> {video.views}</span>
                </div>
                <span className="inline-block mt-2 bg-orange-500/10 text-orange-500 text-xs px-2 py-1 rounded-full capitalize">{video.category}</span>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => editVideo(video)}
                    className="flex-1 py-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all text-sm"><FaEdit /> Edit</button>
                  <button onClick={() => deleteVideo(video._id, video.title)}
                    className="flex-1 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all text-sm"><FaTrash /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}