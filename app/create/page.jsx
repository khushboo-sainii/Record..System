"use client"
import InputField from '../components/InputField'
import '../globals.css'
import { useState } from 'react';

export default function Page() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    age: '',
    gender: '',
    city: '',
    height: '',
    weight: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const response = await fetch("https://record-system-1.onrender.com/patients/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: formData.id,
          name: formData.name,
          city: formData.city,
          age: parseInt(formData.age),
          gender: formData.gender.toLowerCase(),
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Something went wrong!";

        // FastAPI validation error 
        if (Array.isArray(data.detail)) {
          errorMessage = data.detail.map(err => err.msg).join("\n");
        }
        // For detail string
        else if (typeof data.detail === "string") {
          errorMessage = data.detail;
        }
        // For message field 
        else if (data.message) {
          errorMessage = data.message;
        }

        alert(errorMessage);
        return;
      }

      console.log('Response:', data);
      alert(`Patient ${data.name} created successfully!`);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.")
    }
  }

  return (
    <div className="bg-[#dfe9f4] flex justify-center items-center max-h-screen mx-auto my-auto p-5">
      {/* Card container */}
      <div className="bg-white flex flex-col items-center w-full max-w-md rounded-3xl shadow-lg p-2 h-[700px]">
        <h1 className="text-2xl font-semibold mb-3">New Patient</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
          <InputField heading="ID" name="id" value={formData.id} onChange={handleChange} placeholder="P001" readOnly={false} />
          <InputField heading="Name" name="name" value={formData.name} onChange={handleChange} placeholder='John' readOnly={false} />
          <InputField heading="Age" name="age" value={formData.age} onChange={handleChange} placeholder='20' readOnly={false} />
          <InputField heading="Gender" name="gender" value={formData.gender} onChange={handleChange} placeholder='male' readOnly={false} />
          <InputField heading="City" name="city" value={formData.city} onChange={handleChange} placeholder='Rohtak' readOnly={false} />
          <InputField heading="Height" name="height" value={formData.height} onChange={handleChange} placeholder='1.72(In Metres)' readOnly={false} />
          <InputField heading="Weight" name="weight" value={formData.weight} onChange={handleChange} placeholder='60(In Kilograms)' readOnly={false} />

          <button
            type="submit"
            className="bg-[#207bff] hover:bg-blue-600 transition-colors cursor-pointer text-white font-semibold text-lg py-2 w-full rounded-xl mt-2"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}
