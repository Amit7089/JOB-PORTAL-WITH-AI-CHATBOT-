import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";
import { motion } from "framer-motion";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8faff] via-[#eef2ff] to-[#e9ecff]">
      <Navbar />

      {/* Profile Card */}
      <motion.div
        className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-8 shadow-lg hover:shadow-2xl transition-shadow duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-5">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <Avatar className="h-24 w-24 border-2 border-purple-400 shadow-md">
                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
              </Avatar>
            </motion.div>

            <div>
              <h1 className="font-semibold text-2xl">{user?.fullname}</h1>
              <p className="text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="flex items-center gap-2 border-purple-400 hover:bg-purple-100"
            >
              <Pen /> Edit Profile
            </Button>
          </motion.div>
        </div>

        {/* Contact Info */}
        <div className="my-6 flex flex-col md:flex-row gap-6 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="text-purple-400" />
            <a
              href={`mailto:${user?.email}`}
              className="hover:text-purple-600 transition-colors"
            >
              {user?.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="text-purple-400" />
            <a
              href={`tel:${user?.phoneNumber}`}
              className="hover:text-purple-600 transition-colors"
            >
              {user?.phoneNumber}
            </a>
          </div>
        </div>

        {/* Skills */}
        <div className="my-6">
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="transition-transform duration-300"
                >
                  <Badge className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white">
                    {skill}
                  </Badge>
                </motion.div>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="my-6">
          <h2 className="text-lg font-semibold mb-2">Resume</h2>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-blue-600 hover:underline"
            >
              Download {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500">No Resume Found</span>
          )}
        </div>
      </motion.div>

      {/* Applied Jobs */}
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-4">Applied Jobs</h2>
        <AppliedJob />
      </motion.div>

      {/* Edit Profile Modal */}
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
