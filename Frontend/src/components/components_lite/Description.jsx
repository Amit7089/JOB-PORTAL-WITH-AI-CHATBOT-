import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Description = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.application?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error applying for job.");
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (error) {
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f2f6ff] to-[#e8ebf8] text-gray-600 text-lg font-medium">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 font-semibold">
        {error}
      </div>
    );

  if (!singleJob)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        No job found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f7f9ff] to-[#e9ecff] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl rounded-3xl p-10 relative overflow-hidden"
      >
        {/* Glow Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/20 to-transparent rounded-3xl pointer-events-none"
        />

        <div className="relative z-10 space-y-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-5"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {singleJob?.title}
              </h1>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className="bg-blue-50 text-blue-700 border border-blue-100 font-medium">
                  {singleJob?.position} Positions
                </Badge>
                <Badge className="bg-purple-50 text-purple-700 border border-purple-100 font-medium">
                  {singleJob?.salary} LPA
                </Badge>
                <Badge className="bg-orange-50 text-orange-600 border border-orange-100 font-medium">
                  {singleJob?.location}
                </Badge>
                <Badge className="bg-gray-100 text-gray-700 border border-gray-200 font-medium">
                  {singleJob?.jobType}
                </Badge>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`mt-6 md:mt-0 px-8 py-3 rounded-full font-semibold text-white text-base transition-all duration-300 shadow-md ${
                  isApplied
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#4F46E5] to-[#6D28D9] hover:from-[#4338CA] hover:to-[#5B21B6] hover:scale-[1.05]"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </Button>
            </motion.div>
          </motion.div>

          {/* Job Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-b border-gray-100 pb-5"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Job Description
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              {singleJob?.description}
            </p>
          </motion.div>

          {/* Job Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="font-bold text-gray-900 mb-2">Job Details</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>
                  <span className="font-semibold">Role:</span> {singleJob?.position} Positions
                </li>
                <li>
                  <span className="font-semibold">Experience:</span> {singleJob?.experienceLevel} Year
                </li>
                <li>
                  <span className="font-semibold">Salary:</span> {singleJob?.salary} LPA
                </li>
                <li>
                  <span className="font-semibold">Location:</span> {singleJob?.location}
                </li>
                <li>
                  <span className="font-semibold">Job Type:</span> {singleJob?.jobType}
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="font-bold text-gray-900 mb-2">Additional Info</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>
                  <span className="font-semibold">Applicants:</span>{" "}
                  {singleJob?.applications?.length}
                </li>
                <li>
                  <span className="font-semibold">Posted On:</span>{" "}
                  {singleJob?.createdAt?.split("T")[0]}
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-sm text-gray-500 border-t border-gray-100 pt-4"
          >
            ✨ Explore more opportunities and grow your career.
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Description;
