import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaPaperPlane,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return toast.error("Please fill all required fields!");
    }

    if (!form.email.includes("@")) {
      return toast.error("Please enter a valid email!");
    }

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Message sent successfully! 🚀");

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <ToastContainer
        position="top-right"
        toastClassName="bg-gray-900 text-white border border-gray-700"
      />

      <section className="relative py-20 bg-[#0a0a0a]">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Get In <span className="text-orange-500">Touch</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            
            {/* Contact Form */}
            <div className="bg-[#111] border border-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Send Us a <span className="text-orange-500">Message</span>
              </h2>
              <p className="text-gray-400 text-sm mb-8">
                Fill out the form and we'll get back to you within 24 hours
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-400 text-sm block mb-2">
                      Full Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full p-3.5 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none transition-all placeholder:text-gray-600"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm block mb-2">
                      Email Address <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full p-3.5 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none transition-all placeholder:text-gray-600"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Phone & Subject Row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-400 text-sm block mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full p-3.5 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none transition-all placeholder:text-gray-600"
                      placeholder="+92 300 1234567"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm block mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full p-3.5 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none transition-all cursor-pointer"
                    >
                      <option value="">Select Subject</option>
                      <option value="Membership">Membership Inquiry</option>
                      <option value="Personal Training">Personal Training</option>
                      <option value="Group Classes">Group Classes</option>
                      <option value="Diet Plan">Diet Plan</option>
                      <option value="General">General Question</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-gray-400 text-sm block mb-2">
                    Message <span className="text-orange-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full p-3.5 bg-black border border-gray-700 rounded-lg text-white focus:border-orange-500 outline-none transition-all resize-none placeholder:text-gray-600"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 py-4 rounded-full font-semibold text-white hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Side - Info */}
            <div className="space-y-6">
              
              {/* Quick Contact */}
              <div className="bg-[#111] border border-gray-800 rounded-2xl p-8">
                <h3 className="text-white font-bold text-xl mb-6">
                  Contact <span className="text-orange-500">Info</span>
                </h3>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 flex-shrink-0">
                      <FaPhone />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white font-semibold">+92 313 9614220</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 flex-shrink-0">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-semibold">info@fitxgym.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 flex-shrink-0">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white font-semibold">Jarwanda Road, Kohat</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 flex-shrink-0">
                      <FaClock />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Working Hours</p>
                      <p className="text-white font-semibold">Mon-Fri: 5AM - 11PM</p>
                      <p className="text-white font-semibold">Sat-Sun: 6AM - 10PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-[#111] border border-gray-800 rounded-2xl p-8">
                <h3 className="text-white font-bold text-lg mb-4">
                  Follow Us
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Stay connected for latest updates and fitness tips
                </p>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-12 h-12 bg-black border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 text-lg"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-black border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all duration-300 text-lg"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-black border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all duration-300 text-lg"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-black border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 text-lg"
                  >
                    <FaYoutube />
                  </a>
                </div>
              </div>

              {/* CTA Banner */}
              <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white text-center">
                <h3 className="font-bold text-xl mb-3">
                  🏋️ Ready to Start?
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Get a free fitness consultation today!
                </p>
                <button className="bg-white text-orange-500 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all">
                  Get Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}