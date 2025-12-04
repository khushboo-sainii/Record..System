"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import signinImg from "../../public/signin.jpg";
import googleLogo from "../../public/google.png";

const SigninPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const changeHandler = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://record-system-1.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) router.push("/home");
      else {
        const data = await res.json();
        setError(data.detail || "Login failed!");
      }
    } catch {
      setError("Error connecting to server.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://record-system-1.onrender.com/auth/login/google";
  };


  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Image Section */}
      <div className="flex-1 bg-blue-100 flex justify-center items-center h-64 md:h-auto">
        <Image
          src={signinImg}
          alt="Signin"
          className="w-full h-full object-cover md:rounded-r-xl shadow-lg"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10 bg-gray-50">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Log in to your Account
          </h1>
          <p className="text-center mb-4 text-gray-600">
            Welcome back! Select method to log in:
          </p>

          {/* Social Buttons */}
          <div className="flex flex-col mb-4">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer transition-all duration-200">
              <Image src={googleLogo} alt="Google" width={20} height={20} />
              <span className="font-medium">Sign in with Google</span>
            </button>
          </div>

          <div className="text-gray-600 mb-4 text-center">— OR —</div>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={changeHandler}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={changeHandler}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer transition-all duration-200"
            >
              Log In
            </button>
          </form>

          <p className="text-gray-600 mt-4 text-center">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
