import React, { useState } from "react";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (!height || !weight) return;
    
    // Height in cm, Weight in kg
    const heightInM = height / 100;
    const bmiValue = (weight / (heightInM * heightInM)).toFixed(1);
    setBmi(parseFloat(bmiValue));
  };

  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) return { text: "Underweight", color: "text-yellow-500" };
    if (bmi < 25) return { text: "Normal", color: "text-green-500" };
    if (bmi < 30) return { text: "Overweight", color: "text-orange-500" };
    return { text: "Obese", color: "text-red-500" };
  };

  const status = bmi ? getBMIStatus(bmi) : null;

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2">
        BMI <span className="text-orange-500">Calculator</span>
      </h2>
      <p className="text-gray-400 mb-8 text-sm">
        Check your body mass index
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
          <div className="mb-6">
            <label className="text-gray-400 text-sm block mb-3">
              Height (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white outline-none focus:border-orange-500 transition-all"
              placeholder="e.g. 175"
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-400 text-sm block mb-3">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white outline-none focus:border-orange-500 transition-all"
              placeholder="e.g. 70"
            />
          </div>

          <button
            onClick={calculateBMI}
            className="w-full bg-orange-500 py-3 rounded-full font-semibold text-white hover:bg-orange-600 transition-all"
          >
            Calculate BMI
          </button>
        </div>

        {/* Result */}
        <div className="bg-[#111] border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center">
          {bmi ? (
            <>
              <p className="text-gray-400 mb-2">Your BMI</p>
              <h2 className="text-6xl font-bold text-white mb-4">{bmi}</h2>
              <p className={`text-2xl font-bold ${status?.color}`}>
                {status?.text}
              </p>
              <div className="w-full bg-gray-800 h-3 rounded-full mt-6 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 via-green-500 to-red-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((bmi / 40) * 100, 100)}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <span className="text-6xl mb-4">🧮</span>
              <p className="text-gray-400 text-center">
                Enter your height and weight to calculate BMI
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}