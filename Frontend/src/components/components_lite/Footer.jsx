import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
      {/* Animated floating circles */}
      <motion.div
        className="absolute -top-10 -left-10 w-40 h-40 bg-purple-700 rounded-full opacity-20 blur-3xl animate-pulse"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-60 h-60 bg-indigo-600 rounded-full opacity-20 blur-3xl animate-pulse"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold text-purple-400">JobFinder</h2>
          <p className="text-gray-400 mt-3">
            Your trusted platform to find your dream job based on your skills.
          </p>
          <div className="flex gap-4 mt-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
              <motion.a
                key={idx}
                href="#"
                whileHover={{ scale: 1.3, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Quick Links</h3>
          <ul className="flex flex-col gap-3 text-gray-400">
            {["Home","Find Jobs","Companies","About Us","Contact"].map((item, idx) => (
              <li key={idx}>
                <Link to={`/${item.replace(" ", "").toLowerCase()}`} className="hover:text-purple-400 transition-all">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Support</h3>
          <ul className="flex flex-col gap-3 text-gray-400">
            {["Help Center","Privacy Policy","Terms & Conditions","FAQ"].map((item, idx) => (
              <li key={idx}>
                <Link to={`/${item.replace(" ", "").toLowerCase()}`} className="hover:text-purple-400 transition-all">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Contact Us</h3>
          <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3 text-gray-400 mb-3">
            <Mail /> <p>support@jobfinder.com</p>
          </motion.div>
          <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3 text-gray-400 mb-3">
            <Phone /> <p>+91 9876543210</p>
          </motion.div>
          <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3 text-gray-400">
            <MapPin /> <p>Bhopal, Madhya Pradesh, India</p>
          </motion.div>
        </div>
      </div>

      <hr className="border-gray-700 my-8 relative z-10" />

      <div className="text-center text-gray-500 relative z-10">
        <p>© {new Date().getFullYear()} JobFinder. All rights reserved.</p>
      </div>
    </footer>
  );
}


// export default Footer;
