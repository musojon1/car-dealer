"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function FilterPage() {
  const [makes, setMakes] = useState([
    { MakeId: 0, MakeName: "Loading", disabled: true },
  ]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) =>
    (currentYear - i).toString()
  );

  useEffect(() => {
    fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    )
      .then((response) => response.json())
      .then((data) => setMakes(data.Results))
      .catch((error) => console.error("Error fetching makes:", error));
  }, []);

  const isNextDisabled = !selectedMake || !selectedYear;

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Car Dealer App</h1>
      <div className="mb-4">
        <label htmlFor="make" className="block mb-2">
          Select Make:
        </label>
        <select
          id="make"
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a make</option>
          {makes.map((make) => (
            <option
              key={make.MakeId}
              value={make.MakeId}
              disabled={make.disabled}
            >
              {make.MakeName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="year" className="block mb-2">
          Select Year:
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <Link
        href={isNextDisabled ? "#" : `/result/${selectedMake}/${selectedYear}`}
        className={`block w-full text-center py-2 px-4 rounded ${
          isNextDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
        onClick={(e) => {
          if (isNextDisabled) e.preventDefault();
        }}
      >
        Next
      </Link>
    </div>
  );
}
