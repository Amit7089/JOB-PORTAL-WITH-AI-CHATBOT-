import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    if (!query) return;
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center relative pt-24 px-4 bg-gradient-to-br from-[#eef2ff] via-[#f8faff] to-[#e9ecff]">
      {/* Badge */}
      <span className="px-4 mx-auto flex justify-center items-center py-2 gap-2 rounded-full bg-gray-200 text-red-600 font-medium w-max">
        <span className="text-[#614232] text-xl">
          <PiBuildingOfficeBold />
        </span>
        No.1 Job Hunt Website
      </span>

      {/* Heading */}
      <h2 className="text-5xl md:text-6xl font-bold mt-6 text-gray-800">
        Search, Apply & <br />
        Get Your <span className="text-[#6A38C2]">Dream Job</span>
      </h2>

      {/* Subheading */}
      <p className="mt-4 text-gray-600 text-lg">
        Start your hunt for the best life-changing career opportunities from
        here in your selected areas conveniently and get hired quickly.
      </p>

      {/* Modern Search Bar */}
      <motion.div
        className="flex justify-center items-center gap-2 mt-10 w-full max-w-2xl mx-auto shadow-lg bg-white rounded-full p-2"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchjobHandler()}
          placeholder="Search jobs, skills or companies..."
          className="flex-1 px-6 py-3 rounded-full outline-none border-none text-gray-700 placeholder-gray-400 font-medium focus:ring-2 focus:ring-[#6A38C2] transition-all duration-300"
        />
        <motion.button
          onClick={searchjobHandler}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full px-6 py-3 bg-gradient-to-r from-[#6A38C2] to-[#4F46E5] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <Search className="w-5 h-5" /> Search
        </motion.button>
      </motion.div>

      {/* Optional Animated Background Circles */}
      <motion.div
        className="absolute -top-32 -left-32 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl animate-pulse"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity }}
      />
    </div>
  );
};

export default Header;
