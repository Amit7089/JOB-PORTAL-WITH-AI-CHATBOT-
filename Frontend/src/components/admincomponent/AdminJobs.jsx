import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllJAdminobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { motion } from "framer-motion";
import { Briefcase, FileText, Users } from "lucide-react";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const jobs = useSelector((store) => store.jobs.allJobs || []);

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  // Card stats
  const stats = [
    { 
      title: "Total Jobs", 
      value: jobs.length, 
      icon: <Briefcase className="h-6 w-6" />, 
      color: "from-purple-500 to-indigo-500" 
    },
    { 
      title: "Active Jobs", 
      value: jobs.filter(job => job.status === "Active").length, 
      icon: <FileText className="h-6 w-6" />, 
      color: "from-green-400 to-teal-500" 
    },
    { 
      title: "Applicants", 
      value: jobs.reduce((sum, job) => sum + (job.applicants?.length || 0), 0), 
      icon: <Users className="h-6 w-6" />, 
      color: "from-pink-500 to-red-500" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 mt-10">
        {/* Search & Post */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <Input
            className="w-full md:w-1/2"
            placeholder="Filter by Name & Jobs"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Post New Job
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl shadow-lg p-6 flex items-center justify-between cursor-pointer`}
            >
              <div>
                <h3 className="text-lg font-medium">{stat.title}</h3>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className="bg-white/30 p-3 rounded-full">
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Admin Jobs Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <AdminJobsTable />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminJobs;
