import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaDumbbell,
  FaAppleAlt,
  FaDollarSign,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserTie,
} from "react-icons/fa";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    const token = localStorage.getItem("adminToken");

    if (!adminData || !token) {
      navigate("/admin/login");
      return;
    }

    setAdmin(JSON.parse(adminData));
  }, [navigate]);

  const menu = [
    { icon: <FaHome />, text: "Dashboard", path: "/admin/dashboard" },
    { icon: <FaUsers />, text: "Members", path: "/admin/members" },
    { icon: <FaUserTie />, text: "Trainers", path: "/admin/trainers" },
    { icon: <FaDumbbell />, text: "Workouts", path: "/admin/workouts" },
    { icon: <FaAppleAlt />, text: "Diet Plans", path: "/admin/diet" },
    { icon: <FaDollarSign />, text: "Payments", path: "/admin/payments" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="flex bg-black text-white min-h-screen">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-3 bg-black border-b border-gray-800 z-50">
        <h1 className="text-orange-500 font-bold text-xl">FitX Admin</h1>
        <button onClick={() => setOpen(!open)} className="text-white text-xl">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full w-72
          bg-[#0a0a0a] border-r border-gray-800 p-6 z-40
          transition-transform duration-300 flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <h1 className="text-2xl font-bold text-orange-500 mb-2">👑 FitX Admin</h1>
        <p className="text-gray-500 text-sm mb-8">Management Panel</p>

        <div className="space-y-2 flex-1">
          {menu.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              className={`
                flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
                ${
                  location.pathname === item.path
                    ? "bg-orange-500 text-black font-semibold"
                    : "text-gray-400 hover:bg-gray-900 hover:text-white"
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-4">
          <div className="flex items-center gap-3 px-3 mb-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold">
              {admin?.name?.charAt(0) || "A"}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{admin?.name || "Admin"}</p>
              <p className="text-gray-500 text-xs">Administrator</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
        />
      )}

      <div className="flex-1 p-6 md:p-8 mt-16 md:mt-0 overflow-y-auto max-h-screen">
        {children}
      </div>
    </div>
  );
}