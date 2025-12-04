"use client";
import { useEffect, useState } from "react";

export default function ViewPatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("https://record-system-1.onrender.com/patients/view");
        const data = await res.json();
        if (!res.ok) {
          alert(data.detail || "Failed to load patient data.");
          return;
        }
        const patientsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setPatients(patientsArray);
      } catch (err) {
        alert("Failed to load patient data.");
      }
    };
    fetchPatients();
  }, []);

  if (!patients.length) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-linear-to-r from-blue-50 to-blue-100 flex justify-center items-center min-h-screen p-5 font-sans">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-xl p-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-10 text-center">
          🩺 Patient Records
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          {patients.map((patient, index) => (
            <div
              key={patient.id || index}
              className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl shadow-md p-8 hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Patient ID: {patient.id}
              </h2>
              <ul className="space-y-2 text-gray-800">
                <li className="text-lg">
                  <span className="font-medium">Name:</span> {patient.name}
                </li>
                <li className="text-lg">
                  <span className="font-medium">Age:</span> {patient.age}
                </li>
                <li className="text-lg">
                  <span className="font-medium">Gender:</span> {patient.gender}
                </li>
                <li className="text-lg">
                  <span className="font-medium">City:</span> {patient.city}
                </li>
                <li className="text-lg">
                  <span className="font-medium">Height:</span> {patient.height} m
                </li>
                <li className="text-lg">
                  <span className="font-medium">Weight:</span> {patient.weight} kg
                </li>
                <li className="text-lg">
                  <span className="font-medium">BMI:</span> {patient.bmi}
                </li>
                <li className="text-lg">
                  <span className="font-medium">Verdict:</span>{" "}
                  <span
                    className={
                      patient.verdict === "Normal"
                        ? "text-green-600 font-bold"
                        : patient.verdict === "Overweight"
                        ? "text-yellow-600 font-bold"
                        : "text-red-600 font-bold"
                    }
                  >
                    {patient.verdict}
                  </span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
