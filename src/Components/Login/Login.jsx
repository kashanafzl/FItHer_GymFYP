import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../../Assets/1.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitLogin = async () => {
    try {
      if (!email || !password) {
        return toast.error("Please fill all fields");
      }

      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      toast.success("Login successful 🚀");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Invalid credentials");
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

      <div className="w-full max-w-6xl flex border border-gray-800 rounded-2xl overflow-hidden min-h-[90vh]">
        {/* IMAGE */}
        <div className="hidden md:block w-1/2">
          <img src={image} className="w-full h-full object-cover" alt="Gym" />
        </div>

        {/* FORM */}
        <div className="w-full md:w-1/2 bg-black p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white">
            Welcome to <span className="text-orange-500">FitX Gym</span>
          </h2>

          <p className="text-gray-400 text-sm mt-2 mb-8">
            Login to continue your journey
          </p>

          {/* EMAIL */}
          <div className="relative mb-6">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                peer w-full p-3 pt-5 pb-2 
                bg-transparent border border-gray-700 rounded-lg 
                text-white outline-none 
                transition-all duration-300 ease-in-out
                focus:border-orange-500 focus:shadow-[0_0_12px_rgba(249,115,22,0.4)]
              "
              placeholder=" "
            />
            <label
              className="
                absolute left-3 
                text-gray-400 text-base
                transition-all duration-300 ease-in-out
                pointer-events-none
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                peer-focus:top-0 peer-focus:text-xs peer-focus:text-orange-500
                peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-xs
                bg-black px-1
              "
            >
              Email Address
            </label>
          </div>

          {/* PASSWORD */}
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                peer w-full p-3 pt-5 pb-2 pr-10
                bg-transparent border border-gray-700 rounded-lg 
                text-white outline-none 
                transition-all duration-300 ease-in-out
                focus:border-orange-500 focus:shadow-[0_0_12px_rgba(249,115,22,0.4)]
              "
              placeholder=" "
            />

            <label
              className="
                absolute left-3 
                text-gray-400 text-base
                transition-all duration-300 ease-in-out
                pointer-events-none
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                peer-focus:top-0 peer-focus:text-xs peer-focus:text-orange-500
                peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-xs
                bg-black px-1
              "
            >
              Password
            </label>

            {/* Eye Icon */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-orange-500 transition-all duration-200 select-none text-lg"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button
            onClick={submitLogin}
            disabled={loading}
            className="w-full bg-orange-500 py-3 rounded-full font-semibold text-white hover:bg-orange-600 transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-center text-gray-400 mt-6 text-sm">
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="text-orange-500 hover:text-orange-400 underline underline-offset-2 transition-all"
            >
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}