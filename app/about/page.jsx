"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-700 via-blue-600 to-blue-500 text-white py-24 relative">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
            Patient Record Management System
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Secure, scalable, and doctor-friendly platform for managing patient records with ease.
          </p>
          <div className="flex justify-center ">
            <Link
              href="/signup"
              className="bg-blue-100 text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
        {/* Hero Illustration */}
        <div className="mt-12 flex justify-center">
          <img
            src="/hospital.jpg"
            alt="Hospital Illustration"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Core Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-blue-600 mb-2 flex items-center gap-2">
                <img src="/lock.png" alt="Add Icon" className="w-6 h-6" />
                Secure
              </h3>
              <p className="text-gray-600">
                End-to-end encryption and compliance with HIPAA/GDPR standards to protect patient data.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-blue-600 mb-2 flex items-center gap-2">
                <img src="/flash.png" alt="Add Icon" className="w-7 h-6" />
                Fast
              </h3>
              <p className="text-gray-600">
                Optimized queries and scalable architecture for instant access to patient records.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-blue-600 mb-2 flex items-center gap-2">
                <img src="/stethoscope.png" alt="Add Icon" className="w-6 h-6" />
                User-Friendly
              </h3>
              <p className="text-gray-600">
                Intuitive UI with clear error handling so medical staff can focus on care, not tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
            Trusted by Healthcare Professionals
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                src: "/doctor1.jpg",
                name: "Dr. Meera Sharma",
                quote:
                  "This system has streamlined our patient data management — fast, secure, and reliable.",
              },
              {
                src: "/doctor33.png",
                name: "Nurse Rajiv Kumar",
                quote:
                  "Error handling is so clear that even non-technical staff can use it with confidence.",
              },
              {
                src: "/doctor2.jpg",
                name: "Dr. Mahir Sharma",
                quote:
                  "The intuitive UI helped us onboard new staff without any training delays.",
              },
              {
                src: "/doctor4.jpg",
                name: "Dr. Anjali Verma",
                quote:
                  "We've reduced paperwork by 80% and improved patient follow-ups thanks to this system.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  className="w-16 h-16 mx-auto rounded-full object-cover mb-4"
                />
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <h4 className="mt-4 font-bold text-blue-600">— {testimonial.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Patient Record System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
