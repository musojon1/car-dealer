"use client";

import { useState, useEffect } from "react";

export default function VehicleModels({ makeid, year }) {
  const [models, setModels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModels() {
      try {
        const res = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeid}/modelyear/${year}?format=json`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched data:", data); // Debug log
        setModels(data.Results);
      } catch (e) {
        console.error("Fetch error:", e); // Debug log
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchModels();
  }, [makeid, year]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (models.length === 0) {
    return <p>No models found for the selected make and year.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {models.map((model, index) => (
        <div key={model.Model_ID + index} className="border p-4 rounded shadow">
          {/* I'm adding index to the key because some id's are identical */}
          <h2 className="text-lg font-semibold">{model.Model_Name}</h2>
          <p className="text-sm text-gray-600">{model.Make_Name}</p>
        </div>
      ))}
    </div>
  );
}
