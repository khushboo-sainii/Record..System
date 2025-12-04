"use client";
import Link from "next/link";
import CTAForm from "../components/CTAForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      router.replace("/signin");
    } else {
      setToken(storedToken);
    }  
  }, [router]);

  if (!token) {
    return <p>Checking authentication...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
            Patient Record Management System
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            A secure, scalable, and intuitive platform designed for hospitals and clinics to manage patient records efficiently.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/about"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Core Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                <img src="/plus1.png" alt="Add Icon" className="w-6 h-6" />
                Add Patients
              </h3>
              <p className="text-gray-600 mb-4">
                Register new patients with complete demographic and medical details.
              </p>
              <Link href="/create" className="text-blue-700 font-semibold hover:underline">
                Create Patient →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                <img src="/pencil.png" alt="Add Icon" className="w-6 h-6" />
                Update Records
              </h3>
              <p className="text-gray-600 mb-4">
                Edit existing patient information quickly using their unique ID.
              </p>
              <Link href="/edit" className="text-blue-700 font-semibold hover:underline">
                Update Patient →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                <img src="/trash.png" alt="Add Icon" className="w-6 h-6" />
                 Delete Records
              </h3>
              <p className="text-gray-600 mb-4">
                Remove outdated or duplicate patient records securely.
              </p>
              <Link href="/delete" className="text-blue-700 font-semibold hover:underline">
                Delete Patient →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                <img src="/board.png" alt="Add Icon" className="w-6 h-6" />
                View All Patients
              </h3>
              <p className="text-gray-600 mb-4">
                Access a complete list of patients with search and filter options.
              </p>
              <Link href="/view" className="text-blue-700 font-semibold hover:underline">
                View Records →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Trusted by Healthcare Professionals
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 italic">
                "This system streamlined our patient management and saved hours of admin work."
              </p>
              <h4 className="mt-4 font-semibold text-blue-700">Dr. Sharma, Apollo Hospital</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 italic">
                "Secure and easy to use — our staff adopted it instantly."
              </p>
              <h4 className="mt-4 font-semibold text-blue-700">Dr. Mehta, Fortis Clinic</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 italic">
                "This system has streamlined our patient data management — fast, secure, and reliable."
              </p>
              <h4 className="mt-4 font-bold text-blue-600">— Dr. Meera Sharma</h4>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Form */}
      <CTAForm />

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Patient Record Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
