// src/app/signup/page.tsx
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Coffee } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  
  // State untuk form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // 1. Validasi Sederhana
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      // 2. Kirim Data ke API
      // Kita memetakan 'email' ke field 'login' juga agar sesuai logika login sebelumnya
      const payload = {
        name: formData.name,
        email: formData.email,
        login: formData.email, // Penting: field ini dipakai untuk pencarian saat login
        password: formData.password
      };

      await axios.post(
        "https://neededstream-us.backendless.app/api/data/ExerciseHomepageLogin",
        payload
      );

      // 3. Redirect jika sukses
      alert("Registration successful! Please login.");
      router.push("/login");

    } catch (err: any) {
      console.error(err);
      // Menampilkan pesan error dari API atau pesan default
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-coffee-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border-t-4 border-coffee-800">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
             <Coffee size={48} className="text-coffee-800" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Join the Club</h2>
          <p className="text-gray-700 mt-2">Create an account to start your coffee journey.</p>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 text-sm" role="alert">
            <p className="font-bold text-gray-800">Error</p>
            <p>{error}</p>
          </div>
        )}
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-800 text-sm font-bold mb-1">Full Name</label>
            <input 
              name="name"
              type="text" 
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition text-black"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 text-sm font-bold mb-1">Email Address</label>
            <input 
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition text-black"
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 text-sm font-bold mb-1">Password</label>
            <input 
              name="password"
              type="password" 
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition text-black"
              placeholder="Min. 6 characters"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 text-sm font-bold mb-1">Confirm Password</label>
            <input 
              name="confirmPassword"
              type="password" 
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition text-black"
              placeholder="Re-enter password"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-coffee-800 text-black p-3 rounded-lg font-bold text-lg hover:bg-coffee-700 active:scale-95 transition transform duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isLoading ? "Brewing Account..." : "Enter"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-coffee-600 font-bold hover:text-coffee-800 hover:underline">
              Log in here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}