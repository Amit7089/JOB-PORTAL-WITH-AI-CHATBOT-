import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AIChatBot from "./AIChatBot";

const Home = () => {
  const { loading, error } = useGetAllJobs();
  const jobs = useSelector((state) => state.jobs.allJobs);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8faff] via-[#eef2ff] to-[#e9ecff] overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero / Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Header />
        <AIChatBot/>
      </motion.div>

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 mt-10"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Explore Popular <span className="text-[#6A38C2]">Categories</span>
        </h2>
        <Categories />
      </motion.section>

      {/* Latest Jobs Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 mt-20 mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          🧾 Latest <span className="text-[#4F46E5]">Job Openings</span>
        </h2>

        {loading && (
          <p className="text-center text-gray-500 animate-pulse">Loading jobs...</p>
        )}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, duration: 0.6 },
              },
            }}
          >
            <LatestJobs jobs={jobs} />
          </motion.div>
        )}
      </motion.section>

      {/* Highlight / Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 mb-16 grid md:grid-cols-3 gap-8"
      >
        {[
          { title: "Verified Companies", desc: "All jobs are from trusted and verified companies.", color: "from-purple-400 to-indigo-500" },
          { title: "Fast Application", desc: "Apply to jobs with a single click and get quick responses.", color: "from-pink-400 to-red-500" },
          { title: "Premium Support", desc: "24/7 assistance for candidates and recruiters.", color: "from-green-400 to-teal-500" },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`bg-gradient-to-br ${feature.color} text-white rounded-2xl shadow-lg p-6 cursor-pointer`}
          >
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-white/90">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-[#4F46E5] to-[#6D28D9] text-white py-20 text-center rounded-t-[3rem] relative overflow-hidden"
      >
        <motion.div
          className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity }}
        />
        <h3 className="text-4xl md:text-5xl font-semibold mb-4 z-10 relative">
          Ready to <span className="text-yellow-400">Get Hired?</span>
        </h3>
        <p className="text-white/90 mb-8 z-10 relative text-lg">
          Explore thousands of job opportunities and take the next step in your career journey.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-[#4F46E5] px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 z-10 relative"
        >
          Browse Jobs
        </motion.button>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
