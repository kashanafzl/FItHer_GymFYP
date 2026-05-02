import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { FaPhone, FaEnvelope, FaStar, FaDumbbell, FaCertificate, FaArrowLeft } from "react-icons/fa";

export default function TrainerProfile() {
  const { id } = useParams();
  const location = useLocation();
  const [trainer, setTrainer] = useState(location.state || null);
  const [loading, setLoading] = useState(!trainer);

  useEffect(() => {
    if (!trainer) {
      fetchTrainer();
    }
  }, [id]);

  const fetchTrainer = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/trainers/${id}`);
      setTrainer(data);
    } catch (error) {
      console.error("Failed to fetch trainer:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <p>Trainer not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors mb-8"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden h-96">
            {trainer.image ? (
              <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <FaDumbbell className="text-8xl text-gray-700" />
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-4xl font-bold">{trainer.name}</h1>
            <p className="text-orange-500 text-xl mt-2">{trainer.role}</p>
            <p className="text-gray-400 mt-1">{trainer.experience}</p>

            <div className="flex gap-3 mt-4">
              <span className="flex items-center gap-1 text-gray-400">
                <FaPhone className="text-orange-500" /> {trainer.phone}
              </span>
              <span className="flex items-center gap-1 text-gray-400">
                <FaEnvelope className="text-orange-500" /> {trainer.email}
              </span>
            </div>

            {trainer.bio && (
              <p className="text-gray-300 mt-6 leading-relaxed">{trainer.bio}</p>
            )}

            {trainer.specializations?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-white font-semibold mb-3">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {trainer.specializations.map((spec, i) => (
                    <span key={i} className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-sm">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {trainer.certifications?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-white font-semibold mb-3">Certifications</h3>
                <div className="space-y-2">
                  {trainer.certifications.map((cert, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-400">
                      <FaCertificate className="text-orange-500" />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}