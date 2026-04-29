import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-orange-500 mb-4">FitHer</h2>
            <p className="text-gray-400 text-sm mb-4">
              Transform your body and mind with our state-of-the-art facility
              and expert guidance.
            </p>
            <div className="flex gap-3">
              <FaFacebook className="text-gray-400 hover:text-orange-500 cursor-pointer text-xl transition-colors" />
              <FaInstagram className="text-gray-400 hover:text-orange-500 cursor-pointer text-xl transition-colors" />
              <FaTwitter className="text-gray-400 hover:text-orange-500 cursor-pointer text-xl transition-colors" />
              <FaYoutube className="text-gray-400 hover:text-orange-500 cursor-pointer text-xl transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-orange-500 cursor-pointer">Home</li>
              <li className="hover:text-orange-500 cursor-pointer">About</li>
              <li className="hover:text-orange-500 cursor-pointer">Services</li>
              <li className="hover:text-orange-500 cursor-pointer">Trainers</li>
              <li className="hover:text-orange-500 cursor-pointer">Pricing</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-bold mb-4">Working Hours</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Monday - Friday: 5AM - 11PM</li>
              <li>Saturday: 6AM - 10PM</li>
              <li>Sunday: 7AM - 8PM</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <FaPhone className="text-orange-500" /> +92 300 1234567
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-orange-500" /> info@FitHer.com
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-orange-500" /> Kohat, Pakistan
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 FitHer Gym. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}