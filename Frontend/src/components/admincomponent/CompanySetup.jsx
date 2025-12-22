import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar.jsx";
import { Button } from "../ui/button.jsx";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "../../utils/data.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById.jsx";
import { motion } from "framer-motion";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );
      if (res.status === 200 && res.data.message) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      } else {
        throw new Error("Unexpected API response.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
    if (singleCompany.file) setPreview(singleCompany.file);
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto mt-12"
      >
        <form
          onSubmit={submitHandler}
          className="backdrop-blur-md bg-white/70 p-8 rounded-3xl shadow-2xl border border-white/30"
        >
          <div className="flex items-center gap-5 mb-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all"
            >
              <ArrowLeft />
              Back
            </Button>
            <h1 className="text-2xl font-extrabold text-gray-800 tracking-wide">
              Company Setup
            </h1>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              { label: "Company Name", name: "name", type: "text" },
              { label: "Description", name: "description", type: "text" },
              { label: "Website", name: "website", type: "text" },
              { label: "Location", name: "location", type: "text" },
            ].map((field) => (
              <motion.div
                key={field.name}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col gap-1"
              >
                <Label>{field.label}</Label>
                <Input
                  type={field.type}
                  name={field.name}
                  value={input[field.name]}
                  onChange={changeEventHandler}
                  className="transition-all focus:ring-2 focus:ring-gradient-to-r focus:ring-indigo-400/70 focus:border-indigo-500"
                />
              </motion.div>
            ))}

            <motion.div whileHover={{ scale: 1.02 }} className="flex flex-col gap-2 md:col-span-2">
              <Label>Logo</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="cursor-pointer"
                />
                {preview && (
                  <motion.img
                    src={preview}
                    alt="Logo Preview"
                    className="h-20 w-20 rounded-xl border border-gray-200 shadow-md object-cover"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {loading ? (
              <Button className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-xl">
                <Loader2 className="h-5 w-5 animate-spin" /> Updating...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Update Company
              </Button>
            )}
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default CompanySetup;
