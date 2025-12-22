import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";
import { motion } from "framer-motion";
import logo from "../../assets/jobportal logo.png";


const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/logout`,
        {},
        { withCredentials: true }
      );
      if (res?.data?.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        toast.error("Error logging out. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-xl sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6B3AC2] to-[#FA4F09]">
            <img src={logo} alt="logo" className="h-16 w-auto" />

          </h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          {user && user.role === "Recruiter" ? (
            <>
              <li>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link to="/admin/companies" className="hover:text-purple-500">
                    Companies
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link to="/admin/jobs" className="hover:text-purple-500">
                    Jobs
                  </Link>
                </motion.div>
              </li>
            </>
          ) : (
            <>
              <li>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link to="/Home" className="hover:text-purple-500">
                    Home
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link to="/Browse" className="hover:text-purple-500">
                    Browse
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link to="/Jobs" className="hover:text-purple-500">
                    Jobs
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link to="/Creator" className="hover:text-purple-500">
                    About
                  </Link>
                </motion.div>
              </li>
            </>
          )}
        </ul>

        {/* Desktop Auth */}
        {!user ? (
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-[#FF512F] to-[#DD2476] text-white">
                Register
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt={user?.fullname}
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="flex items-center gap-3 mb-3">
                <Avatar>
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname}
                  />
                </Avatar>
                <div>
                  <h3 className="font-semibold">{user?.fullname}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {user?.profile?.bio || "No bio added"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {user.role === "Student" && (
                  <Link
                    to="/Profile"
                    className="flex items-center gap-2"
                  >
                    <User2 /> Profile
                  </Link>
                )}
                <button
                  onClick={logoutHandler}
                  className="flex items-center gap-2 text-red-500"
                >
                  <LogOut /> Logout
                </button>
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden bg-white shadow-lg px-6 py-4"
        >
          <ul className="flex flex-col gap-4 font-medium text-gray-700">
            {user && user.role === "Recruiter" ? (
              <>
                <Link onClick={() => setIsOpen(false)} to="/admin/companies">
                  Companies
                </Link>
                <Link onClick={() => setIsOpen(false)} to="/admin/jobs">
                  Jobs
                </Link>
              </>
            ) : (
              <>
                <Link onClick={() => setIsOpen(false)} to="/Home">Home</Link>
                <Link onClick={() => setIsOpen(false)} to="/Browse">Browse</Link>
                <Link onClick={() => setIsOpen(false)} to="/Jobs">Jobs</Link>
                <Link onClick={() => setIsOpen(false)} to="/Creator">About</Link>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex flex-col gap-3 mt-4">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-[#FF512F] to-[#DD2476] text-white">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-3">
              {user.role === "Student" && (
                <Link to="/Profile" onClick={() => setIsOpen(false)}>
                  Profile
                </Link>
              )}
              <button onClick={logoutHandler} className="text-red-500 text-left">
                Logout
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
