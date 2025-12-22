import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/usegetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companyslice";
import { motion } from "framer-motion";

const Companies = () => {
  const navigate = useNavigate();
  useGetAllCompanies();

  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-[#e2ebff] to-[#dce7ff] overflow-x-hidden relative">
      {/* Floating shapes for modern effect */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-300/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl animate-pulse-slow" />

      {/* Navbar */}
      <Navbar />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mt-10 px-4 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 drop-shadow-lg">
          Companies
        </h1>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <Input
            className="w-full md:w-64 shadow-lg border border-gray-300 hover:shadow-purple-200 transition-all duration-300"
            placeholder="Search Companies"
            onChange={(e) => setInput(e.target.value)}
          />
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="transition-all duration-300"
          >
            <Button
              onClick={() => navigate("/admin/companies/create")}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Add Company
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Companies Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto mt-6 px-4 py-6 bg-white rounded-3xl shadow-2xl border border-gray-200"
      >
        {/* Animated Table Rows */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.05 },
            },
          }}
        >
          <CompaniesTable rowAnimation={true} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Companies;
