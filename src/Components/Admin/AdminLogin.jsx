import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLogin() {
  // ✅ Empty initial values - user khud type karega
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    if (!email.includes("@")) {
      return toast.error("Please enter a valid email");
    }

    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));
      toast.success("Welcome Admin! 🎯");

      setTimeout(() => navigate("/admin/dashboard"), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <ToastContainer
        position="top-right"
        toastClassName="bg-gray-900 text-white border border-gray-700"
      />

      <div className="w-full max-w-md">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/20">
            <span className="text-white text-3xl">👑</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Admin <span className="text-orange-500">Panel</span>
          </h1>
          <p className="text-gray-400">Sign in to manage FitX Gym</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="bg-[#111] border border-gray-800 rounded-2xl p-8 shadow-xl"
        >
          {/* Email Field */}
          <div className="mb-5">
            <label className="text-gray-400 text-sm block mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                📧
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3.5 pl-10 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none transition-all placeholder:text-gray-600"
                placeholder="admin@fitxgym.com"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="text-gray-400 text-sm block mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                🔒
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3.5 pl-10 pr-12 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none transition-all placeholder:text-gray-600"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition-colors"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-4 rounded-full font-bold text-white hover:from-orange-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/40 transform hover:-translate-y-0.5"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Hint */}
          <p className="text-center text-gray-600 text-xs mt-4">
            Default: amber@gmail.com / 123456
          </p>
        </form>
      </div>
    </div>
  );
}