import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaDumbbell, FaPhone, FaEnvelope, FaStar } from "react-icons/fa";

export default function Trainers() {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  // API se trainers fetch karo
  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      // Public API - sirf active trainers
      const { data } = await axios.get("http://localhost:5000/api/trainers");
      setTrainers(data);
    } catch (error) {
      console.error("Failed to fetch trainers:", error);
      // Fallback to empty array
      setTrainers([]);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Our <span className="text-orange-500">Trainers</span>
          </h2>
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold"
        >
          Our <span className="text-orange-500">Trainers</span>
        </motion.h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Professional certified trainers to guide your fitness journey
        </p>

        {/* Trainers Grid */}
        {trainers.length === 0 ? (
          // No trainers state
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <FaDumbbell className="text-6xl mb-4 opacity-30" />
            <p className="text-lg">No trainers available right now</p>
            <p className="text-sm mt-2">Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {trainers.map((trainer, i) => (
              <motion.div
                key={trainer._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden hover:border-orange-500 transition-all duration-300 group shadow-lg hover:shadow-orange-500/10"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  {trainer.image ? (
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <FaDumbbell className="text-6xl text-gray-700" />
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="p-5 text-left">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                    {trainer.name}
                  </h3>

                  <p className="text-orange-500 text-sm font-semibold mt-1">
                    {trainer.role}
                  </p>

                  <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                    <FaStar className="text-yellow-500 text-xs" />
                    {trainer.experience}
                  </p>

                  {/* Contact Icons */}
                  <div className="flex items-center gap-3 mt-3 text-gray-400 text-xs">
                    {trainer.email && (
                      <span className="flex items-center gap-1 truncate" title={trainer.email}>
                        <FaEnvelope className="text-gray-600" />
                        {trainer.email}
                      </span>
                    )}
                  </div>

                  {trainer.phone && (
                    <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
                      <FaPhone className="text-gray-600" />
                      {trainer.phone}
                    </div>
                  )}

                  {/* Specializations */}
                  {trainer.specializations?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {trainer.specializations.slice(0, 3).map((spec, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-500/10 text-orange-500 text-[10px] px-2 py-0.5 rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                      {trainer.specializations.length > 3 && (
                        <span className="text-gray-500 text-[10px]">
                          +{trainer.specializations.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* View Profile Button */}
                  <button
                    onClick={() =>
                      navigate(`/trainer/${trainer._id}`, { state: trainer })
                    }
                    className="mt-4 w-full bg-orange-500 py-2.5 rounded-full font-semibold text-white hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Total Trainers Count */}
        {trainers.length > 0 && (
          <p className="text-gray-600 mt-8 text-sm">
            {trainers.length} professional trainer{trainers.length > 1 ? "s" : ""} available
          </p>
        )}
      </div>
    </section>
  );
}