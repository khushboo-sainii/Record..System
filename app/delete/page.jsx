"use client";
import "../globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Delete() {
  const router = useRouter();
  const [patientId, setPatientId] = useState("");

  const handleChange = (e) => {
    setPatientId(e.target.value);
  };

  const handleFetch = () => {
    if (!patientId) {
      alert("Please enter a Patient ID first.");
      return;
    }
    router.push(`/delete/${patientId}`);
  };

  return (
    <div className="bg-[#dfe9f4] flex justify-center items-center min-h-screen p-5">
      <div className="bg-white flex flex-col items-center w-full max-w-md rounded-3xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-3">Delete Patient</h1>
        <div className="flex flex-row w-[89%] gap-4 mb-4 ">
          <input
      type="text"
      name="id"
      value={patientId}
      onChange={handleChange}
      placeholder="P001"
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
    />

     <button
    type="button"
    onClick={handleFetch}
    className="h-[38px] px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition"
  >
    Fetch
  </button>
        </div>
      </div>
    </div>
  );
}
