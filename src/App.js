import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/LandingPage/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/SignUp/Signup";
import Strength from "./Components/LandingPage/Strength/Strength";
import Health from "./Components/LandingPage/Healthcare/Health";
import DietPage from "./Components/LandingPage/Diret/Diet";
import Cardio from "./Components/LandingPage/Cardio/Cardio";
import TrainingDetails from "./Components/LandingPage/Training Section/TrainingDetails";
import FatLoss from "./Components/LandingPage/Training Section/FatLoss";
import TrainerProfile from "./Components/LandingPage/Trainers Section/TrainerProfile";

/* ✅ DASHBOARD IMPORTS */
import DashboardLayout from "./Components/DashboardLayout/DashboardLayout";
import HomeDashboard from "./Components/DashboardLayout/HomeDashboard";
import Profile from "./Components/DashboardLayout/Profile";
import Workouts from "./Components/DashboardLayout/Workouts";
import Diet from "./Components/DashboardLayout/Diet";
import BMICalculator from "./Components/DashboardLayout/BMICalculator";
import Progress from "./Components/DashboardLayout/Progress";
import Contact from "./Components/LandingPage/Contact/Contact";

/* 👑 ADMIN IMPORTS */
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminTrainers from "./Components/Admin/AdminTrainers";
import AdminMembers from "./Components/Admin/AdminMembers";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🌍 LANDING */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🏋️ PAGES */}
        <Route path="/strength" element={<Strength />} />
        <Route path="/health" element={<Health />} />
        <Route path="/diet" element={<DietPage />} />
        <Route path="/cardio" element={<Cardio />} />
        <Route path="/contact" element={<Contact />} />

        {/* 🔥 TRAINING */}
        <Route path="/training/:type" element={<TrainingDetails />} />
        <Route path="/trainer/:id" element={<TrainerProfile />} />
        <Route path="/fat-loss" element={<FatLoss />} />

        {/* 💪 USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <HomeDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/workouts"
          element={
            <DashboardLayout>
              <Workouts />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/diet"
          element={
            <DashboardLayout>
              <Diet />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/progress"
          element={
            <DashboardLayout>
              <Progress />
            </DashboardLayout>
          }
        />

        
        <Route
          path="/dashboard/bmi"
          element={
            <DashboardLayout>
              <BMICalculator />
            </DashboardLayout>
          }
        />

        {/* 👑 ADMIN PANEL */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/trainers"
          element={
            <AdminLayout>
              <AdminTrainers />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/members"
          element={
            <AdminLayout>
              <AdminMembers />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}