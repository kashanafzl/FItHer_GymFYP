import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaUsers,
  FaEnvelope,
  FaPhone,
  FaBullseye,
  FaWeight,
  FaSave,
  FaTimes,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";

export default function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalMembers, setTotalMembers] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
  }, [page, search]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      
      const { data } = await axios.get(
        `http://localhost:5000/api/admin/members?search=${search}&page=${page}&limit=10`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMembers(data.members);
      setTotalMembers(data.total);
      setTotalPages(data.pages);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMembers();
  };

  // Open Edit Modal
  const openEditModal = (member) => {
    setEditMember(member);
    setEditForm({
      name: member.name || "",
      email: member.email || "",
      phone: member.phone || "",
      age: member.age || "",
      weight: member.weight || "",
      height: member.height || "",
      goal: member.goal || "",
      address: member.address || "",
    });
    setShowEditModal(true);
  };

  // Handle Edit Form Change
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Save Edited Member
  const saveMember = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("adminToken");

      await axios.put(
        `http://localhost:5000/api/admin/members/${editMember._id}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Member updated successfully! ✅");
      setShowEditModal(false);
      fetchMembers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  // Delete Member
  const deleteMember = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone!`)) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/admin/members/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      toast.success(`${name} deleted successfully! 🗑️`);
      fetchMembers();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // View Member Detail
  const viewMember = (id) => {
    navigate(`/admin/members/${id}`);
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
            Members <span className="text-orange-500">Management</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Total: <span className="text-orange-500 font-bold">{totalMembers}</span> members
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
          <FaUsers className="text-blue-500 text-xl mb-2" />
          <p className="text-gray-400 text-xs">Total Members</p>
          <h3 className="text-white text-2xl font-bold">{totalMembers}</h3>
        </div>
        <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
          <FaBullseye className="text-green-500 text-xl mb-2" />
          <p className="text-gray-400 text-xs">With Goals Set</p>
          <h3 className="text-white text-2xl font-bold">
            {members.filter(m => m.goal).length}
          </h3>
        </div>
        <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
          <FaWeight className="text-purple-500 text-xl mb-2" />
          <p className="text-gray-400 text-xs">Weight Logged</p>
          <h3 className="text-white text-2xl font-bold">
            {members.filter(m => m.weight).length}
          </h3>
        </div>
        <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
          <FaUser className="text-orange-500 text-xl mb-2" />
          <p className="text-gray-400 text-xs">This Page</p>
          <h3 className="text-white text-2xl font-bold">{members.length}</h3>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3.5 pl-12 bg-[#111] border border-gray-800 rounded-lg text-white focus:border-orange-500 outline-none"
            placeholder="Search members by name, email or phone..."
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-orange-600 transition-all"
          >
            Search
          </button>
        </div>
      </form>

      {/* Members Table */}
      <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 bg-black/50">
                <th className="p-4 text-left text-gray-400 text-xs uppercase">Member</th>
                <th className="p-4 text-left text-gray-400 text-xs uppercase hidden md:table-cell">Contact</th>
                <th className="p-4 text-left text-gray-400 text-xs uppercase hidden md:table-cell">Stats</th>
                <th className="p-4 text-left text-gray-400 text-xs uppercase hidden lg:table-cell">Goal</th>
                <th className="p-4 text-left text-gray-400 text-xs uppercase hidden lg:table-cell">Joined</th>
                <th className="p-4 text-center text-gray-400 text-xs uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-500">
                    <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    Loading members...
                  </td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-500">
                    <FaUsers className="text-5xl mx-auto mb-3 opacity-50" />
                    <p>No members found</p>
                    {search && <p className="text-sm">Try different search terms</p>}
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr
                    key={member._id}
                    className="border-b border-gray-800/50 hover:bg-gray-900/50 transition-colors"
                  >
                    {/* Name + Avatar */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {member.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-semibold truncate">
                            {member.name}
                          </p>
                          <p className="text-gray-500 text-xs md:hidden truncate">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="p-4 hidden md:table-cell">
                      <div className="space-y-1">
                        <p className="text-gray-400 text-sm flex items-center gap-1">
                          <FaEnvelope className="text-xs text-gray-600" />
                          {member.email}
                        </p>
                        {member.phone && (
                          <p className="text-gray-500 text-xs flex items-center gap-1">
                            <FaPhone className="text-xs text-gray-600" />
                            {member.phone}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Stats */}
                    <td className="p-4 hidden md:table-cell">
                      <div className="flex gap-3 text-sm">
                        {member.weight ? (
                          <span className="text-white">
                            <span className="text-orange-500 font-bold">{member.weight}</span> kg
                          </span>
                        ) : (
                          <span className="text-gray-600">-- kg</span>
                        )}
                        {member.height ? (
                          <span className="text-gray-500">
                            <span className="text-gray-400">{member.height}</span> cm
                          </span>
                        ) : (
                          <span className="text-gray-600">-- cm</span>
                        )}
                      </div>
                      {member.age && (
                        <p className="text-gray-500 text-xs mt-1">Age: {member.age}</p>
                      )}
                    </td>

                    {/* Goal */}
                    <td className="p-4 hidden lg:table-cell">
                      {member.goal ? (
                        <span className="bg-orange-500/10 text-orange-500 text-xs px-3 py-1 rounded-full border border-orange-500/20">
                          {member.goal}
                        </span>
                      ) : (
                        <span className="text-gray-600 text-xs">Not set</span>
                      )}
                    </td>

                    {/* Joined Date */}
                    <td className="p-4 hidden lg:table-cell">
                      <span className="text-gray-400 text-sm flex items-center gap-1">
                        <FaCalendarAlt className="text-xs text-gray-600" />
                        {new Date(member.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => viewMember(member._id)}
                          className="p-2.5 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => openEditModal(member)}
                          className="p-2.5 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-all"
                          title="Edit Member"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteMember(member._id, member.name)}
                          className="p-2.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                          title="Delete Member"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-[#222] border border-gray-700 rounded-lg text-white disabled:opacity-30 hover:border-orange-500 transition-all"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-[#222] border border-gray-700 rounded-lg text-white disabled:opacity-30 hover:border-orange-500 transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Member Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                Edit <span className="text-orange-500">Member</span>
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Name</label>
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Email</label>
                <input
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                  disabled
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Phone</label>
                <input
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Age</label>
                <input
                  name="age"
                  type="number"
                  value={editForm.age}
                  onChange={handleEditChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Weight (kg)</label>
                <input
                  name="weight"
                  type="number"
                  value={editForm.weight}
                  onChange={handleEditChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Height (cm)</label>
                <input
                  name="height"
                  type="number"
                  value={editForm.height}
                  onChange={handleEditChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm block mb-2">Goal</label>
                <select
                  name="goal"
                  value={editForm.goal}
                  onChange={handleEditChange}
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none cursor-pointer"
                >
                  <option value="">-- Select Goal --</option>
                  <option value="Lose Weight">Lose Weight</option>
                  <option value="Build Muscle">Build Muscle</option>
                  <option value="Stay Fit">Stay Fit</option>
                  <option value="Strength">Strength</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm block mb-2">Address</label>
                <textarea
                  name="address"
                  value={editForm.address}
                  onChange={handleEditChange}
                  rows="3"
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 py-3 bg-gray-700 rounded-full font-semibold text-white hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={saveMember}
                disabled={saving}
                className="flex-1 py-3 bg-orange-500 rounded-full font-semibold text-white hover:bg-orange-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaSave />
                )}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}