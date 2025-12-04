"use client";
import { use } from "react";   
import InputField from "../../components/InputField.jsx";
import { useEffect, useState } from "react";

export default function EditPatient({ params }) {
  const { id } = use(params);   
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await fetch(`https://record-system-1.onrender.com/patients/patients/${id}`);
        const data = await res.json();
        if (!res.ok) {
          alert(data.detail || "Failed to load patient data.");
          return;
        }
        setFormData({
          id: id, // 
          name: data.name || "",
          age: data.age ? data.age.toString() : "",
          gender: data.gender || "",
          city: data.city || "",
          height: data.height ? data.height.toString() : "",
          weight: data.weight ? data.weight.toString() : "",
        });
      } catch (err) {
        alert("Failed to load patient data.");
      }
    };
    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://record-system-1.onrender.com/patients/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        age: parseInt(formData.age),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
      }),
    });
    const result = await res.json();
    if (!res.ok) {
      alert(result.detail || "Update failed!");
      return;
    }
    alert(result.message || "Updated!");
  };

  if (!formData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-[#dfe9f4] flex justify-center items-center min-h-screen p-5">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-3">Edit Patient: {id}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Patient ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              readOnly
              className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-600 cursor-not-allowed"
            />
          </div>
          <InputField heading="Name" name="name" value={formData.name} onChange={handleChange} readOnly={false} />
          <InputField heading="Age" name="age" value={formData.age} onChange={handleChange} readOnly={false} />
          <InputField heading="Gender" name="gender" value={formData.gender} onChange={handleChange} readOnly={false} />
          <InputField heading="City" name="city" value={formData.city} onChange={handleChange} readOnly={false} />
          <InputField heading="Height" name="height" value={formData.height} onChange={handleChange} readOnly={false} />
          <InputField heading="Weight" name="weight" value={formData.weight} onChange={handleChange} readOnly={false} />
          <button type="submit" className="bg-green-600 text-white py-2 rounded-xl mt-2">Update</button>
        </form>
      </div>
    </div>
  );
}
