import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Kolhapur",
      "Pune",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Remote",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Scientist",
      "Fullstack",
      "Node",
      "Python",
      "Java",
      "frontend",
      "backend",
      "mobile",
      "desktop",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const Filter = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value) => setSelectedValue(value);

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-6 transition-all duration-300 hover:shadow-md">
      <h1 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
        Filter Jobs
      </h1>

      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-3">
              {data.filterType}
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {data.array.map((item, indx) => {
                const itemId = `Id${index}-${indx}`;
                const isSelected = selectedValue === item;
                return (
                  <div
                    key={itemId}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all duration-300
                      ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 shadow-sm scale-[1.02]"
                          : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                      }`}
                    onClick={() => handleChange(item)}
                  >
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className={`transition-transform duration-200 ${
                        isSelected ? "scale-110 border-blue-500" : ""
                      }`}
                    />
                    <label
                      htmlFor={itemId}
                      className={`cursor-pointer select-none text-sm font-medium transition-colors duration-200 ${
                        isSelected ? "text-blue-700" : "text-gray-700"
                      }`}
                    >
                      {item}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filter;
