import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate, Link } from "react-router-dom";
import { RadioGroup } from "../ui/radio-group";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { motion } from "framer-motion";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-blue-600/25 rounded-full blur-[150px] -top-40 -left-40 animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[160px] bottom-0 right-0 animate-pulse delay-1000"></div>
      </div>

      {/* Main Section */}
      <div className="flex flex-1 flex-col lg:flex-row items-center justify-center px-6 py-20 relative z-10">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:flex flex-col justify-center items-center text-center w-1/2 relative"
        >
          {/* Floating Animated Avatar */}
          <motion.img
            src="https://img.freepik.com/premium-photo/portrait-successful-programmer-game-developer-coder-guy-uses-computer-laptop-work-game-design-hacker-boy-generative-ai-cyber-gamer_117038-7605.jpg?w=2000"
            alt="login avatar"
            className="w-80 drop-shadow-2xl"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-extrabold text-white mt-10 drop-shadow-lg"
          >
            Welcome to JobPortal 🚀
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-blue-200 text-lg mt-4 max-w-md leading-relaxed"
          >
            Your dream job is just one login away.  
            Connect. Apply. Succeed.
          </motion.p>
        </motion.div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 
                     shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-8 md:p-10 
                     hover:shadow-[0_30px_80px_rgba(0,0,0,0.55)] transition-all"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-white">Login 👋</h1>
            <p className="text-blue-200 text-sm mt-2">
              Sign in to continue your journey
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <Label className="text-white">Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="you@example.com"
                className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <div>
              <Label className="text-white">Password</Label>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="********"
                className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <RadioGroup className="flex justify-center gap-6 mt-6">
              {["Student", "Recruiter"].map((role) => (
                <label
                  key={role}
                  className={`px-6 py-2 rounded-full cursor-pointer border text-sm font-medium 
                              transition-all duration-300 ${
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

            {/* Enhanced Buttons */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full mt-8 py-3 rounded-xl font-semibold 
                         bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 
                         text-white shadow-lg hover:shadow-cyan-400/40 
                         relative overflow-hidden transition-all"
            >
              <span className="relative z-10">
                {loading ? "Logging in..." : "Login"}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
            </motion.button>

            <div className="text-center mt-6">
              <p className="text-gray-300 text-sm">New here?</p>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full mt-3 py-3 rounded-xl font-semibold 
                             bg-white/20 border border-white/30 text-white 
                             hover:bg-white/30 shadow-md hover:shadow-white/30 transition-all"
                >
                  Create Account
                </motion.button>
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
