import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUsers,
  FaUserPlus,
  FaUserCheck,
  FaDollarSign,
  FaDumbbell,
  FaAppleAlt,
  FaUserTie,
  FaCalendarCheck,
  FaChartLine,
  FaArrowRight,
  FaSpinner,
} from "react-icons/fa";
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
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get("http://localhost:5000/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(data);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mock chart data (Replace with real API data)
  const weeklyMembers = [
    { day: "Mon", members: 5 },
    { day: "Tue", members: 8 },
    { day: "Wed", members: 12 },
    { day: "Thu", members: 7 },
    { day: "Fri", members: 15 },
    { day: "Sat", members: 20 },
    { day: "Sun", members: 10 },
  ];

  const monthlyRevenue = [
    { month: "Jan", revenue: 50000 },
    { month: "Feb", revenue: 65000 },
    { month: "Mar", revenue: 55000 },
    { month: "Apr", revenue: 80000 },
    { month: "May", revenue: 75000 },
    { month: "Jun", revenue: 90000 },
  ];

  const statCards = [
    {
      icon: <FaUsers />,
      label: "Total Members",
      value: stats?.totalMembers || 0,
      change: "+12%",
      positive: true,
      color: "bg-blue-500/10",
      iconColor: "text-blue-500",
      borderColor: "border-blue-500/30",
    },
    {
      icon: <FaUserPlus />,
      label: "New This Month",
      value: stats?.newMembers || 0,
      change: "+5%",
      positive: true,
      color: "bg-green-500/10",
      iconColor: "text-green-500",
      borderColor: "border-green-500/30",
    },
    {
      icon: <FaUserCheck />,
      label: "Active Members",
      value: stats?.activeMembers || 0,
      change: "85%",
      positive: true,
      color: "bg-purple-500/10",
      iconColor: "text-purple-500",
      borderColor: "border-purple-500/30",
    },
    {
      icon: <FaDollarSign />,
      label: "Revenue",
      value: `PKR ${(stats?.revenue || 0).toLocaleString()}`,
      change: "+18%",
      positive: true,
      color: "bg-yellow-500/10",
      iconColor: "text-yellow-500",
      borderColor: "border-yellow-500/30",
    },
  ];

  const quickActions = [
    {
      icon: <FaUserTie />,
      title: "Manage Trainers",
      desc: "Add, edit or remove trainers",
      path: "/admin/trainers",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaUsers />,
      title: "View Members",
      desc: "See all gym members",
      path: "/admin/members",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FaDumbbell />,
      title: "Workouts",
      desc: "Manage workout plans",
      path: "/admin/workouts",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <FaAppleAlt />,
      title: "Diet Plans",
      desc: "Create diet schedules",
      path: "/admin/diet",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const recentActivities = [
    { icon: "👤", text: "New member joined: Ahmed Khan", time: "5 min ago", color: "text-green-500" },
    { icon: "💪", text: "Trainer John Smith updated profile", time: "1 hour ago", color: "text-blue-500" },
    { icon: "💰", text: "Payment received: PKR 5,000", time: "3 hours ago", color: "text-yellow-500" },
    { icon: "🎯", text: "New workout plan created", time: "5 hours ago", color: "text-orange-500" },
    { icon: "📋", text: "Member profile updated: Sara Ali", time: "Yesterday", color: "text-purple-500" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <FaSpinner className="animate-spin text-orange-500 text-4xl" />
      </div>
    );
  }

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
          Welcome Back, <span className="text-orange-500">{admin?.name || "Admin"}</span> 👋
        </h2>
        <p className="text-gray-400 mt-1">
          Here's what's happening at FitX Gym today
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((card, i) => (
          <div
            key={i}
            className={`bg-[#111] border ${card.borderColor} rounded-xl p-5 hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center ${card.iconColor} text-xl`}>
                {card.icon}
              </div>
              <span
                className={`text-xs font-bold ${
                  card.positive ? "text-green-500" : "text-red-500"
                } bg-green-500/10 px-2 py-1 rounded-full`}
              >
                {card.change}
              </span>
            </div>
            <p className="text-gray-400 text-sm">{card.label}</p>
            <h3 className="text-white text-2xl font-bold mt-1">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Members Chart */}
        <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <FaChartLine className="text-orange-500" />
              Weekly New Members
            </h3>
            <span className="text-gray-500 text-sm">This Week</span>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyMembers}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar
                dataKey="members"
                fill="#f97316"
                radius={[8, 8, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <FaDollarSign className="text-green-500" />
              Monthly Revenue
            </h3>
            <span className="text-gray-500 text-sm">2024</span>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ fill: "#22c55e", r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions + Recent Activity Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h3 className="text-white font-bold text-lg mb-4">Quick Actions</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => navigate(action.path)}
                className="bg-[#111] border border-gray-800 rounded-xl p-5 text-left hover:border-orange-500 transition-all group"
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center text-white mb-3`}>
                  {action.icon}
                </div>
                <h4 className="text-white font-semibold group-hover:text-orange-500 transition-colors">
                  {action.title}
                </h4>
                <p className="text-gray-500 text-sm mt-1">{action.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-orange-500 text-sm opacity-0 group-hover:opacity-100 transition-all">
                  <span>Go</span>
                  <FaArrowRight className="text-xs" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Recent Activity</h3>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
            <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 pb-4 border-b border-gray-800 last:border-0 last:pb-0"
                >
                  <span className="text-xl">{activity.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-300 text-sm">{activity.text}</p>
                    <p className="text-gray-600 text-xs mt-1">{activity.time}</p>
                  </div>
                  <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${activity.color} bg-current`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4 text-center">
          <FaCalendarCheck className="text-blue-500 text-2xl mx-auto mb-2" />
          <h4 className="text-white font-bold text-lg">Today's Check-ins</h4>
          <p className="text-blue-300 text-2xl font-bold">24</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4 text-center">
          <FaDumbbell className="text-green-500 text-2xl mx-auto mb-2" />
          <h4 className="text-white font-bold text-lg">Active Trainers</h4>
          <p className="text-green-300 text-2xl font-bold">8</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4 text-center">
          <FaUsers className="text-purple-500 text-2xl mx-auto mb-2" />
          <h4 className="text-white font-bold text-lg">Classes Today</h4>
          <p className="text-purple-300 text-2xl font-bold">12</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4 text-center">
          <FaDollarSign className="text-orange-500 text-2xl mx-auto mb-2" />
          <h4 className="text-white font-bold text-lg">Today's Revenue</h4>
          <p className="text-orange-300 text-2xl font-bold">PKR 15,000</p>
        </div>
      </div>
    </div>
  );
}