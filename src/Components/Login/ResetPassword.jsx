import React, { useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReset = async () => {
    if (!password || !confirmPassword) {
      return toast.error("Dono fields bharein");
    }

    if (password.length < 6) {
      return toast.error("Password 6+ characters must");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords not match");
    }

    setLoading(true);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );

      toast.success(res.data.message || "Password reset ! 🎉");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Token invalid expired, try again"
      );
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

      <div className="w-full max-w-md bg-[#111] border border-gray-800 rounded-2xl p-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔑</div>
          <h2 className="text-2xl font-bold text-white">
            Reset <span className="text-orange-500">Password</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            new password
          </p>
        </div>

        {/* New Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              peer w-full p-3 pt-5 pb-2 pr-10
              bg-transparent border border-gray-700 rounded-lg 
              text-white outline-none 
              transition-all duration-300
              focus:border-orange-500 focus:shadow-[0_0_12px_rgba(249,115,22,0.4)]
            "
            placeholder=" "
          />
          <label
            className="
              absolute left-3 text-gray-400 text-base
              transition-all duration-300 pointer-events-none
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
              peer-focus:top-0 peer-focus:text-xs peer-focus:text-orange-500
              peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-xs
              bg-[#111] px-1
            "
          >
            New Password
          </label>
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-orange-500 select-none"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-6">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitReset()}
            className="
              peer w-full p-3 pt-5 pb-2 pr-10
              bg-transparent border border-gray-700 rounded-lg 
              text-white outline-none 
              transition-all duration-300
              focus:border-orange-500 focus:shadow-[0_0_12px_rgba(249,115,22,0.4)]
            "
            placeholder=" "
          />
          <label
            className="
              absolute left-3 text-gray-400 text-base
              transition-all duration-300 pointer-events-none
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
              peer-focus:top-0 peer-focus:text-xs peer-focus:text-orange-500
              peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-xs
              bg-[#111] px-1
            "
          >
            Confirm Password
          </label>
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-orange-500 select-none"
          >
            {showConfirm ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          onClick={submitReset}
          disabled={loading}
          className="w-full bg-orange-500 py-3 rounded-full font-semibold text-white hover:bg-orange-600 transition-all disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <p className="text-center text-gray-400 mt-6 text-sm">
          <NavLink
            to="/login"
            className="text-orange-500 hover:text-orange-400 underline"
          >
            ← Back to Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}