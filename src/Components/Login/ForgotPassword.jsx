import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submitForgot = async () => {
    if (!email) {
      return toast.error("Email address daalein");
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      toast.success(res.data.message || "Email send! 📧");
      setSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "wrong email address");
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
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-white">
            Forgot <span className="text-orange-500">Password?</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Email Enter , then reset . inbox check (spam folder)
          </p>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="text-6xl mb-4">📧</div>
            <h3 className="text-xl font-bold text-white mb-2">
              Email send
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              <span className="text-orange-500">{email}</span> pe reset link
            check the reset (Spam folder bhi).
            </p>
            <NavLink
              to="/login"
              className="text-orange-500 hover:text-orange-400 underline"
            >
              ← Back to Login
            </NavLink>
          </div>
        ) : (
          <>
            <div className="relative mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitForgot()}
                className="
                  peer w-full p-3 pt-5 pb-2 
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
                Email Address
              </label>
            </div>

            <button
              onClick={submitForgot}
              disabled={loading}
              className="w-full bg-orange-500 py-3 rounded-full font-semibold text-white hover:bg-orange-600 transition-all disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="text-center text-gray-400 mt-6 text-sm">
              back?{" "}
              <NavLink
                to="/login"
                className="text-orange-500 hover:text-orange-400 underline"
              >
                Login
              </NavLink>
            </p>
          </>
        )}
      </div>
    </div>
  );
}