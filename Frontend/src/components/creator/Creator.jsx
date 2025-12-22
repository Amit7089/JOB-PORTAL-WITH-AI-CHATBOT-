import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components_lite/Navbar";
import Footer from "../components_lite/Footer";
import { Users, Briefcase, Globe } from "lucide-react";

const aboutFeatures = [
  {
    icon: <Briefcase className="h-8 w-8 text-white" />,
    title: "Thousands of Jobs",
    description: "Explore a wide variety of opportunities across multiple industries and locations.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: <Globe className="h-8 w-8 text-white" />,
    title: "Global Reach",
    description: "Connect with companies and jobs not just locally, but globally for a wider horizon.",
    color: "from-pink-500 to-red-500",
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: "Trusted Network",
    description: "We partner only with verified companies to provide reliable and secure opportunities.",
    color: "from-green-400 to-teal-500",
  },
];

const Creator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-[#e2ebff] to-[#dce7ff] overflow-x-hidden relative">
      {/* Floating shapes for animation */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-300/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl animate-pulse-slow" />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto mt-16 px-4"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 drop-shadow-lg">
          About <span className="text-purple-600">Job Portal</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Empowering job seekers and recruiters alike with a seamless platform to find, post, and manage job opportunities. Our mission is to bridge the gap between talent and opportunity.
        </p>
      </motion.div>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mt-16 px-4 grid md:grid-cols-3 gap-8"
      >
        {aboutFeatures.map((feature, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: idx * 0.2 } },
            }}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-br ${feature.color} text-white rounded-2xl p-6 shadow-lg cursor-pointer`}
          >
            <div className="flex items-center justify-center mb-4 w-12 h-12 rounded-full bg-white/20">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-white/90">{feature.description}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Value Proposition / Team Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto mt-20 px-4 text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Why Choose <span className="text-purple-600">Us?</span>
        </h2>
        <p className="text-gray-600 mb-12">
          We prioritize user experience, provide real-time opportunities, and ensure a trusted network for both job seekers and employers.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
          >
            <h3 className="font-bold text-lg mb-2">Easy Navigation</h3>
            <p className="text-gray-600">
              Intuitive UI for smooth browsing and quick access to jobs and company profiles.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
          >
            <h3 className="font-bold text-lg mb-2">Real-time Updates</h3>
            <p className="text-gray-600">
              Get notified instantly when new jobs are posted or your applications progress.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
          >
            <h3 className="font-bold text-lg mb-2">Verified Companies</h3>
            <p className="text-gray-600">
              We partner only with trusted and verified companies for a secure job hunt experience.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Creator;
