"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Redirect jika sudah login
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ login: email, password });
  };

return (
    <div className="min-h-screen flex items-center justify-center bg-coffee-200 py-12 px-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-black mb-6">Coffee Club Login</h2>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-coffee-500"
              placeholder="Enter your login"
              style={{color: 'black'}}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-coffee-500"
              placeholder="Enter your password"
              style={{color: 'black'}}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-coffee-800 text-black p-3 rounded font-bold hover:bg-coffee-700 transition disabled:opacity-50 shadow-md"
          >
            {isLoading ? "Brewing..." : "Enter"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm border-t border-gray-100 pt-4">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-coffee-600 font-bold hover:text-coffee-800 hover:underline">
              Register now
            </Link>
          </p>
        </div>
        {/* --------------------------- */}

      </div>
    </div>
  );
}
