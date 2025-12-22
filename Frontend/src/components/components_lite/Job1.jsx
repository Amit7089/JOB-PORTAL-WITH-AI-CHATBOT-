import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Bookmark, BookMarked } from "lucide-react";

const Job1 = ({ job }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div
      className="relative p-6 bg-white rounded-xl border border-gray-200 
      shadow-sm hover:shadow-md hover:border-blue-200 
      transition-all duration-300 ease-in-out transform hover:-translate-y-1 
      cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all"
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          {isBookmarked ? (
            <BookMarked className="text-blue-600 transition-all duration-300 scale-105" />
          ) : (
            <Bookmark className="text-gray-600 hover:text-blue-600 transition-all duration-300" />
          )}
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mt-4">
        <div className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50">
          <Avatar className="w-10 h-10">
            <AvatarImage src={job?.company?.logo} alt="company logo" />
          </Avatar>
        </div>
        <div>
          <h1 className="font-semibold text-gray-900">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Info */}
      <div className="mt-4">
        <h2 className="font-bold text-lg text-gray-900 mb-1 hover:text-blue-700 transition-colors">
          {job?.title}
        </h2>
        <p className="text-sm text-gray-600 leading-snug line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="bg-gray-100 text-blue-700 font-medium border border-blue-100">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-gray-100 text-red-600 font-medium border border-red-100">
          {job?.jobType}
        </Badge>
        <Badge className="bg-gray-100 text-purple-700 font-medium border border-purple-100">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 mt-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="border-gray-300 hover:border-blue-500 hover:text-blue-700 
          font-medium transition-all duration-200"
        >
          Details
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job1;
