import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { motion } from "framer-motion";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    pancard: "",
    adharcard: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const ChangeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(input).forEach((key) => {
      if (input[key]) formData.append(key, input[key]);
    });

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Background Decorative Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/30 blur-[180px] top-0 left-0"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-700/30 blur-[200px] bottom-0 right-0"></div>
      </div>

      {/* Main Section */}
      <div className="flex flex-1 items-center justify-center relative z-10 px-6 lg:px-12">
        <div className="w-full max-w-6xl h-[85vh] rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-[0_20px_80px_rgba(0,0,0,0.5)] bg-white/10 backdrop-blur-2xl border border-white/20">
          
          {/* LEFT SIDE - Illustration and tagline */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex flex-col justify-center items-center text-center w-1/2 bg-gradient-to-br from-blue-600/50 to-cyan-500/30 p-8 relative"
          >
            <motion.img
              src="https://img.freepik.com/premium-photo/3d-illustration-cartoon-character-avatar-profile_1183071-136.jpg"
              alt=""
              className="w-72 mb-6 drop-shadow-2xl"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <h2 className="text-4xl font-extrabold text-white drop-shadow-md">
              Create Your Account 🧑‍💼
            </h2>
            <p className="text-blue-100 mt-3 text-lg max-w-md leading-relaxed">
              Join thousands of job seekers and recruiters on <b>JobPortal</b>.  
              Your next opportunity starts here!
            </p>
          </motion.div>

          {/* RIGHT SIDE - FORM */}
          <motion.form
            onSubmit={submitHandler}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 h-full overflow-y-auto lg:overflow-hidden p-8 sm:p-10 text-white"
          >
            <h1 className="text-3xl font-extrabold text-center mb-6">
              Register Now ✨
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Full Name</Label>
                <Input
                  name="fullname"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  placeholder="John Doe"
                  className="bg-white/20 border-none text-white placeholder:text-gray-300 focus:ring-2 focus:ring-cyan-400 mt-1"
                />
              </div>
              <div>
                <Label className="text-white">Email</Label>
                <Input
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="johndoe@gmail.com"
                  className="bg-white/20 border-none text-white placeholder:text-gray-300 focus:ring-2 focus:ring-cyan-400 mt-1"
                />
              </div>
              <div>
                <Label className="text-white">Password</Label>
                <Input
                  name="password"
                  type="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="********"
                  className="bg-white/20 border-none text-white placeholder:text-gray-300 focus:ring-2 focus:ring-cyan-400 mt-1"
                />
              </div>
              <div>
                <Label className="text-white">Phone Number</Label>
                <Input
                  name="phoneNumber"
                  type="tel"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  placeholder="+91 9876543210"
                  className="bg-white/20 border-none text-white placeholder:text-gray-300 focus:ring-2 focus:ring-cyan-400 mt-1"
                />
              </div>
              <div>
                <Label className="text-white">PAN Number</Label>
                <Input
                  name="pancard"
                  value={input.pancard}
                  onChange={changeEventHandler}
                  placeholder="ABCDE1234F"
                  className="bg-white/20 border-none text-white placeholder:text-gray-300 focus:ring-2 focus:ring-cyan-400 mt-1"
                />
              </div>
              <div>
                <Label className="text-white">Aadhar Number</Label>
                <Input
                  name="adharcard"
                  value={input.adharcard}
                  onChange={changeEventHandler}
                  placeholder="1234 5678 9012"
                  className="bg-white/20 border-none text-white placeholder:text-gray-300 focus:ring-2 focus:ring-cyan-400 mt-1"
                />
              </div>
            </div>


            {/* File Upload */}
            <div className="mt-6">
              <Label className="text-white">Profile Photo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={ChangeFilehandler}
                className="cursor-pointer bg-white/20 border-none text-white mt-1"
              />
            </div>

               {/* Role */}
            <RadioGroup className="flex justify-center gap-6 mt-6">
              {["Student", "Recruiter"].map((role) => (
                <label
                  key={role}
                  className={`px-6 py-2 rounded-full cursor-pointer border text-sm font-medium transition-all duration-300 ${
                    input.role === role
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-lg scale-105"
                      : "bg-white/10 text-gray-200 border-white/30 hover:border-cyan-400 hover:text-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={input.role === role}
                    onChange={changeEventHandler}
                    className="hidden"
                  />
                  {role}
                </label>
              ))}
            </RadioGroup>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full mt-8 py-3 rounded-xl font-semibold 
                         bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 
                         text-white shadow-lg hover:shadow-cyan-400/40 transition-all disabled:opacity-70"
            >
              {loading ? "Registering..." : "Register"}
            </motion.button>

            <p className="text-gray-300 text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-400 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Register;
