import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaBrain,
  FaBone,
  FaLungs,
  FaClinicMedical,
  FaAllergies,
  FaArrowLeft,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaWeight,
  FaRulerVertical,
  FaCalendarAlt,
  FaDumbbell,
  FaRunning,
  FaCalculator,
} from "react-icons/fa";

export default function PatientDiet() {
  // Step management
  const [step, setStep] = useState("form"); // "form" | "conditions" | "detail"
  
  // Patient Info Form
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    condition: "",
  });

  // Calculated BMI
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState(null);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo({ ...patientInfo, [name]: value });
  };

  // Calculate BMI
  const calculateBMI = () => {
    if (patientInfo.height && patientInfo.weight) {
      const heightInM = patientInfo.height / 100;
      const bmiValue = (patientInfo.weight / (heightInM * heightInM)).toFixed(1);
      setBmi(parseFloat(bmiValue));

      // BMI Category
      if (bmiValue < 18.5) setBmiCategory("Underweight");
      else if (bmiValue < 25) setBmiCategory("Normal Weight");
      else if (bmiValue < 30) setBmiCategory("Overweight");
      else setBmiCategory("Obese");
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!patientInfo.name || !patientInfo.age || !patientInfo.height || !patientInfo.weight || !patientInfo.condition) {
      alert("Please fill all required fields");
      return;
    }

    calculateBMI();
    
    // Find selected condition
    const condition = conditions.find((c) => c.id === patientInfo.condition || c.title === patientInfo.condition);
    if (condition) {
      setSelectedCondition(condition.id);
      setStep("detail");
    } else {
      setStep("conditions");
    }
  };

  // Get customized exercise recommendations based on condition
  const getExercises = (conditionId) => {
    const exercises = {
      diabetes: [
        { name: "Brisk Walking", duration: "30-45 min", frequency: "Daily", icon: "🚶" },
        { name: "Cycling", duration: "20-30 min", frequency: "3-4x week", icon: "🚴" },
        { name: "Swimming", duration: "30 min", frequency: "3x week", icon: "🏊" },
        { name: "Light Strength Training", duration: "20 min", frequency: "2-3x week", icon: "💪" },
        { name: "Yoga for Diabetes", duration: "30 min", frequency: "3x week", icon: "🧘" },
      ],
      bp: [
        { name: "Brisk Walking", duration: "30 min", frequency: "Daily", icon: "🚶" },
        { name: "Light Jogging", duration: "20 min", frequency: "3-4x week", icon: "🏃" },
        { name: "Stretching", duration: "15 min", frequency: "Daily", icon: "🤸" },
        { name: "Tai Chi", duration: "30 min", frequency: "3x week", icon: "🧘" },
        { name: "Stationary Cycling", duration: "25 min", frequency: "3x week", icon: "🚴" },
      ],
      thyroid: [
        { name: "Walking", duration: "30 min", frequency: "Daily", icon: "🚶" },
        { name: "Yoga (Neck & Shoulder)", duration: "20 min", frequency: "Daily", icon: "🧘" },
        { name: "Light Weight Training", duration: "20 min", frequency: "3x week", icon: "💪" },
        { name: "Pilates", duration: "30 min", frequency: "2-3x week", icon: "🤸" },
        { name: "Swimming", duration: "25 min", frequency: "2x week", icon: "🏊" },
      ],
      arthritis: [
        { name: "Stretching", duration: "15-20 min", frequency: "Daily", icon: "🤸" },
        { name: "Water Aerobics", duration: "30 min", frequency: "3x week", icon: "🏊" },
        { name: "Tai Chi", duration: "30 min", frequency: "3x week", icon: "🧘" },
        { name: "Gentle Yoga", duration: "20 min", frequency: "Daily", icon: "🧘" },
        { name: "Cycling (Low Impact)", duration: "20 min", frequency: "3x week", icon: "🚴" },
      ],
      digestive: [
        { name: "Walking After Meals", duration: "15-20 min", frequency: "Daily", icon: "🚶" },
        { name: "Yoga (Digestive poses)", duration: "20 min", frequency: "Daily", icon: "🧘" },
        { name: "Light Stretching", duration: "10-15 min", frequency: "Daily", icon: "🤸" },
        { name: "Deep Breathing", duration: "10 min", frequency: "2x day", icon: "🌬️" },
        { name: "Gentle Cycling", duration: "20 min", frequency: "3x week", icon: "🚴" },
      ],
      allergies: [
        { name: "Indoor Walking", duration: "30 min", frequency: "Daily", icon: "🚶" },
        { name: "Indoor Yoga", duration: "25 min", frequency: "3-4x week", icon: "🧘" },
        { name: "Light Strength Training", duration: "20 min", frequency: "2-3x week", icon: "💪" },
        { name: "Stretching", duration: "15 min", frequency: "Daily", icon: "🤸" },
        { name: "Indoor Cycling", duration: "20 min", frequency: "3x week", icon: "🚴" },
      ],
    };
    return exercises[conditionId] || exercises.diabetes;
  };

  const conditions = [
    {
      id: "diabetes",
      icon: <FaHeart />,
      title: "Diabetes",
      color: "from-blue-500 to-cyan-500",
      desc: "Blood sugar control diet & exercise plan",
      diet: {
        recommended: [
          "Whole grains (brown rice, oats)",
          "Green leafy vegetables",
          "Lean proteins (chicken, fish)",
          "Nuts and seeds (limited)",
          "Low GI fruits (berries, apples)",
        ],
        avoid: [
          "Sugar and sweets",
          "White bread and pasta",
          "Sugary drinks",
          "Fried foods",
          "Processed snacks",
        ],
        mealPlan: [
          { meal: "Breakfast", food: "Oats with cinnamon + Boiled eggs", time: "7:00 AM" },
          { meal: "Lunch", food: "Brown rice + Grilled chicken + Salad", time: "1:00 PM" },
          { meal: "Snack", food: "Handful of almonds + Green tea", time: "4:00 PM" },
          { meal: "Dinner", food: "Fish + Steamed vegetables", time: "7:30 PM" },
        ],
        tips: [
          "Eat small frequent meals",
          "Monitor blood sugar regularly",
          "Stay hydrated with water",
          "30 min walk after meals",
        ],
      },
    },
    {
      id: "bp",
      icon: <FaLungs />,
      title: "High Blood Pressure",
      color: "from-red-500 to-pink-500",
      desc: "Heart-healthy low sodium diet & gentle exercise",
      diet: {
        recommended: [
          "Bananas and potassium-rich foods",
          "Leafy greens (spinach, kale)",
          "Berries (blueberries, strawberries)",
          "Oats and whole grains",
          "Low-fat dairy products",
        ],
        avoid: [
          "Salt and high sodium foods",
          "Processed and canned foods",
          "Pickles and chutneys",
          "Alcohol",
          "Red meat (limit)",
        ],
        mealPlan: [
          { meal: "Breakfast", food: "Oatmeal + Banana + Low-fat milk", time: "7:30 AM" },
          { meal: "Lunch", food: "Grilled fish + Quinoa + Steamed veggies", time: "1:00 PM" },
          { meal: "Snack", food: "Yogurt with berries", time: "4:00 PM" },
          { meal: "Dinner", food: "Vegetable soup + Whole wheat roti", time: "7:00 PM" },
        ],
        tips: [
          "Reduce salt intake (DASH diet)",
          "Exercise 30 min daily",
          "Manage stress with meditation",
          "Check BP regularly",
        ],
      },
    },
    {
      id: "thyroid",
      icon: <FaBrain />,
      title: "Thyroid Disorders",
      color: "from-purple-500 to-violet-500",
      desc: "Iodine-rich balanced diet with moderate exercise",
      diet: {
        recommended: [
          "Iodized salt",
          "Seafood and fish",
          "Eggs and dairy",
          "Nuts (Brazil nuts, almonds)",
          "Whole grains",
        ],
        avoid: [
          "Raw cruciferous vegetables (cabbage, broccoli)",
          "Soy products (excess)",
          "Processed foods",
          "Excess fiber",
          "Caffeine (limit)",
        ],
        mealPlan: [
          { meal: "Breakfast", food: "Scrambled eggs + Whole wheat toast", time: "8:00 AM" },
          { meal: "Lunch", food: "Fish curry + Brown rice + Salad", time: "1:00 PM" },
          { meal: "Snack", food: "Mixed nuts + Apple", time: "4:30 PM" },
          { meal: "Dinner", food: "Chicken soup + Cooked vegetables", time: "7:30 PM" },
        ],
        tips: [
          "Take thyroid medication as prescribed",
          "Maintain healthy weight",
          "Avoid skipping meals",
          "Regular thyroid check-ups",
        ],
      },
    },
    {
      id: "arthritis",
      icon: <FaBone />,
      title: "Arthritis & Joint Pain",
      color: "from-orange-500 to-yellow-500",
      desc: "Anti-inflammatory diet with gentle exercises",
      diet: {
        recommended: [
          "Fatty fish (salmon, tuna)",
          "Turmeric and ginger",
          "Olive oil",
          "Nuts and seeds",
          "Colorful vegetables",
        ],
        avoid: [
          "Red meat",
          "Fried and processed foods",
          "Sugar and refined carbs",
          "Dairy (if sensitive)",
          "Alcohol",
        ],
        mealPlan: [
          { meal: "Breakfast", food: "Turmeric oats + Walnuts + Honey", time: "7:30 AM" },
          { meal: "Lunch", food: "Salmon + Sweet potato + Broccoli", time: "1:00 PM" },
          { meal: "Snack", food: "Ginger tea + Mixed seeds", time: "4:00 PM" },
          { meal: "Dinner", food: "Vegetable curry with olive oil + Roti", time: "7:00 PM" },
        ],
        tips: [
          "Include omega-3 rich foods",
          "Stay physically active",
          "Maintain healthy weight",
          "Use anti-inflammatory spices",
        ],
      },
    },
    {
      id: "digestive",
      icon: <FaClinicMedical />,
      title: "Digestive Issues",
      color: "from-green-500 to-emerald-500",
      desc: "Gut-friendly diet with light activity",
      diet: {
        recommended: [
          "Bananas and papaya",
          "Yogurt and probiotics",
          "Rice and easily digestible foods",
          "Boiled vegetables",
          "Ginger and mint",
        ],
        avoid: [
          "Spicy and oily foods",
          "Raw vegetables",
          "Citrus fruits (if sensitive)",
          "Caffeine and carbonated drinks",
          "Heavy dairy products",
        ],
        mealPlan: [
          { meal: "Breakfast", food: "Banana + Yogurt + Honey", time: "8:00 AM" },
          { meal: "Lunch", food: "Khichdi (rice + lentils) + Boiled veggies", time: "12:30 PM" },
          { meal: "Snack", food: "Papaya + Mint tea", time: "4:00 PM" },
          { meal: "Dinner", food: "Vegetable soup + Soft roti", time: "7:00 PM" },
        ],
        tips: [
          "Eat slowly and chew well",
          "Avoid lying down after meals",
          "Stay hydrated",
          "Include probiotics daily",
        ],
      },
    },
    {
      id: "allergies",
      icon: <FaAllergies />,
      title: "Food Allergies",
      color: "from-pink-500 to-rose-500",
      desc: "Allergen-free safe diet & indoor exercises",
      diet: {
        recommended: [
          "Identify and avoid trigger foods",
          "Fresh home-cooked meals",
          "Rice and gluten-free grains",
          "Fresh fruits and vegetables",
          "Lean meats and fish",
        ],
        avoid: [
          "Common allergens (peanuts, shellfish, etc.)",
          "Processed and packaged foods",
          "Artificial colors and preservatives",
          "Cross-contaminated foods",
          "Unknown ingredient dishes",
        ],
        mealPlan: [
          { meal: "Breakfast", food: "Rice porridge + Fresh fruits", time: "7:30 AM" },
          { meal: "Lunch", food: "Grilled chicken + Rice + Steamed veggies", time: "1:00 PM" },
          { meal: "Snack", food: "Fresh fruit smoothie", time: "4:00 PM" },
          { meal: "Dinner", food: "Fish + Mashed potatoes + Salad", time: "7:00 PM" },
        ],
        tips: [
          "Read food labels carefully",
          "Keep food diary",
          "Carry emergency medication",
          "Inform restaurants about allergies",
        ],
      },
    },
  ];

  const selected = conditions.find((c) => c.id === selectedCondition);
  const exercises = selectedCondition ? getExercises(selectedCondition) : [];

  // ==== PATIENT FORM STEP ====
  if (step === "form") {
    return (
      <div className="min-h-screen bg-black py-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Patient <span className="text-orange-500">Assessment</span>
            </h1>
            <p className="text-gray-400">
              Enter your details to get a personalized diet & exercise plan
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-[#111] border border-gray-800 rounded-2xl p-8">
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">
                  <FaUser className="inline mr-2 text-orange-500" />
                  Full Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={patientInfo.name}
                  onChange={handleInputChange}
                  className="w-full p-3.5 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                  placeholder="Enter your name"
                />
              </div>

              {/* Age & Gender Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">
                    <FaCalendarAlt className="inline mr-2 text-orange-500" />
                    Age <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={patientInfo.age}
                    onChange={handleInputChange}
                    className="w-full p-3.5 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                    placeholder="25"
                    min="1"
                    max="120"
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-sm block mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={patientInfo.gender}
                    onChange={handleInputChange}
                    className="w-full p-3.5 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none cursor-pointer"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Height & Weight Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">
                    <FaRulerVertical className="inline mr-2 text-orange-500" />
                    Height (cm) <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={patientInfo.height}
                    onChange={handleInputChange}
                    className="w-full p-3.5 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                    placeholder="170"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-sm block mb-2">
                    <FaWeight className="inline mr-2 text-orange-500" />
                    Weight (kg) <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={patientInfo.weight}
                    onChange={handleInputChange}
                    className="w-full p-3.5 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none"
                    placeholder="70"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Medical Condition */}
              <div>
                <label className="text-gray-400 text-sm block mb-2">
                  🏥 Medical Condition <span className="text-orange-500">*</span>
                </label>
                <select
                  name="condition"
                  value={patientInfo.condition}
                  onChange={handleInputChange}
                  className="w-full p-3.5 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none cursor-pointer"
                >
                  <option value="">-- Select Your Condition --</option>
                  <option value="diabetes">Diabetes</option>
                  <option value="bp">High Blood Pressure</option>
                  <option value="thyroid">Thyroid Disorders</option>
                  <option value="arthritis">Arthritis & Joint Pain</option>
                  <option value="digestive">Digestive Issues</option>
                  <option value="allergies">Food Allergies</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-4 rounded-full font-bold text-white hover:from-orange-600 hover:to-red-700 transition-all text-lg shadow-lg shadow-orange-500/20"
              >
                Get My Personalized Plan 🎯
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ==== CONDITIONS GRID ====
  if (step === "conditions") {
    return (
      <div className="min-h-screen bg-black py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => setStep("form")} className="flex items-center gap-2 text-gray-400 hover:text-orange-500 mb-8">
            <FaArrowLeft /> Back to Form
          </button>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Select Your <span className="text-orange-500">Condition</span>
            </h1>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditions.map((condition) => (
              <motion.div
                key={condition.id}
                whileHover={{ scale: 1.03 }}
                onClick={() => {
                  setSelectedCondition(condition.id);
                  setStep("detail");
                }}
                className="cursor-pointer bg-[#111] border border-gray-800 rounded-2xl p-8 hover:border-orange-500 transition-all"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${condition.color} rounded-xl flex items-center justify-center text-white text-2xl mb-5`}>
                  {condition.icon}
                </div>
                <h3 className="text-white font-bold text-xl mb-2">{condition.title}</h3>
                <p className="text-gray-400 text-sm">{condition.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==== DETAIL VIEW (Diet + Exercise Plan) ====
  return (
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button onClick={() => setStep("form")} className="flex items-center gap-2 text-gray-400 hover:text-orange-500 mb-8">
          <FaArrowLeft /> Back to Assessment
        </button>

        {/* Patient Info Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111] border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-bold text-xl mb-4">
            Patient: <span className="text-orange-500">{patientInfo.name}</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-black/50 rounded-lg p-3 text-center">
              <p className="text-gray-500">Age</p>
              <p className="text-white font-bold">{patientInfo.age} years</p>
            </div>
            <div className="bg-black/50 rounded-lg p-3 text-center">
              <p className="text-gray-500">Height</p>
              <p className="text-white font-bold">{patientInfo.height} cm</p>
            </div>
            <div className="bg-black/50 rounded-lg p-3 text-center">
              <p className="text-gray-500">Weight</p>
              <p className="text-white font-bold">{patientInfo.weight} kg</p>
            </div>
            <div className="bg-black/50 rounded-lg p-3 text-center">
              <p className="text-gray-500">BMI</p>
              <p className="text-orange-500 font-bold">{bmi} ({bmiCategory})</p>
            </div>
          </div>
        </motion.div>

        {selected && (
          <>
            {/* Condition Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111] border border-gray-800 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-5">
                <div className={`w-16 h-16 bg-gradient-to-br ${selected.color} rounded-xl flex items-center justify-center text-white text-3xl`}>
                  {selected.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{selected.title} <span className="text-orange-500">Plan</span></h2>
                  <p className="text-gray-400">{selected.desc}</p>
                </div>
              </div>
            </motion.div>

            {/* Recommended & Avoid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#111] border border-gray-800 rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Recommended Foods</h3>
                <ul className="space-y-3">
                  {selected.diet.recommended.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300"><span className="text-green-500">✅</span>{item}</li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#111] border border-gray-800 rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><FaTimesCircle className="text-red-500" /> Foods to Avoid</h3>
                <ul className="space-y-3">
                  {selected.diet.avoid.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300"><span className="text-red-500">❌</span>{item}</li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Meal Plan */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111] border border-gray-800 rounded-2xl p-6 mb-6">
              <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2"><FaClock className="text-orange-500" /> Daily Meal Plan</h3>
              <div className="space-y-4">
                {selected.diet.mealPlan.map((meal, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 bg-black/50 rounded-xl border border-gray-800">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">{i + 1}</div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">{meal.meal}</p>
                      <p className="text-gray-400">{meal.food}</p>
                    </div>
                    <span className="text-orange-500 bg-orange-500/10 px-4 py-2 rounded-full text-sm">{meal.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Exercise Plan - NEW! */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111] border border-gray-800 rounded-2xl p-6 mb-6">
              <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2"><FaDumbbell className="text-green-500" /> Recommended Exercises</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {exercises.map((exercise, i) => (
                  <div key={i} className="bg-black/50 rounded-xl p-4 border border-gray-800 hover:border-green-500 transition-all">
                    <span className="text-3xl mb-3 block">{exercise.icon}</span>
                    <p className="text-white font-semibold">{exercise.name}</p>
                    <p className="text-gray-400 text-sm">⏱ {exercise.duration}</p>
                    <p className="text-green-500 text-xs mt-1">📅 {exercise.frequency}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111] border border-gray-800 rounded-2xl p-6 mb-6">
              <h3 className="text-white font-bold text-xl mb-4">💡 Important Tips</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {selected.diet.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-black/50 rounded-xl border border-gray-800">
                    <span className="text-orange-500 font-bold">•</span>
                    <span className="text-gray-300">{tip}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Disclaimer */}
           
          </>
        )}
      </div>
    </div>
  );
}