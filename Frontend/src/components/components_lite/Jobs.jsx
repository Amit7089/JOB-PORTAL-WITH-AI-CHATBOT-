import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (!searchedQuery || searchedQuery.trim() === "") {
      setFilterJobs(allJobs);
      return;
    }

    const filteredJobs = allJobs.filter((job) => {
      const query = searchedQuery.toLowerCase();
      return (
        job.title?.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query) ||
        job.experience?.toLowerCase().includes(query) ||
        job.salary?.toLowerCase().includes(query)
      );
    });

    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] via-[#f3f6fb] to-[#e8eef9]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 mt-6 pb-10">
        <div className="flex gap-6">
          {/* Sidebar Filter */}
          <div className="w-1/4 bg-white border border-gray-200 rounded-xl shadow-sm p-4 h-fit sticky top-24">
            <FilterCard />
          </div>

          {/* Job Listing Area */}
          <div className="flex-1 h-[85vh] overflow-y-auto pr-1">
            {filterJobs.length <= 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-600 text-lg font-medium">
                  😕 No jobs found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Job1 job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
