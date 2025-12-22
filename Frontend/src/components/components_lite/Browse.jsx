import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f9ff] via-[#eef2ff] to-[#eaf1ff]">
      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            🔍 Browse Jobs
          </h1>
          <span className="text-gray-600 font-medium bg-white/80 px-4 py-1 rounded-full shadow-sm border border-gray-200">
            {allJobs.length} results found
          </span>
        </motion.div>

        {/* Job Cards */}
        {allJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-64 text-gray-500 text-lg"
          >
            No jobs available at the moment.
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {allJobs.map((job) => (
              <motion.div
                key={job._id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <Job1 job={job} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Browse;
