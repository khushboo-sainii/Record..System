"use client"
import React, {use, useEffect, useState } from 'react'
import InputField from "../../components/InputField.jsx";

const DeletePatient = ({params}) => {
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
                    id: id,
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

    const handleSubmit =  async (e) => {
        e.preventDefault();
        const res = await fetch(`https://record-system-1.onrender.com/patients/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();
        if (!res.ok) {
            alert(result.detail || "Delete failed!");
            return;
        }
        alert(result.message || "Deleted!");
    };

    if (!formData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-[#dfe9f4] flex justify-center items-center min-h-screen p-5">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-3">Delete Patient: {id}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
          <InputField heading="Name" name="name" value={formData.name} readOnly={true} />
          <InputField heading="Age" name="age" value={formData.age} readOnly={true} />
          <InputField heading="Gender" name="gender" value={formData.gender} readOnly={true} />
          <InputField heading="City" name="city" value={formData.city} readOnly={true} />
          <InputField heading="Height" name="height" value={formData.height} readOnly={true} />
          <InputField heading="Weight" name="weight" value={formData.weight} readOnly={true} />
          <button type="submit" className="bg-green-600 text-white py-2 rounded-xl mt-2">Delete</button>
        </form>
      </div>
    </div>
  );
}

export default DeletePatient
