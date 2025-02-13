"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError(""); // Clear previous errors
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/loginback.png')", backgroundAttachment: "fixed" }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Login Form */}
      <motion.div
        className="relative bg-gray-800 p-8 rounded-lg border border-blue-500 shadow-lg w-full max-w-sm text-white"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-center text-blue-300 mb-4">Login</h1>

        {/* Temporary Credentials Message */}
        <p className="text-sm text-gray-300 text-center mb-3">
          🔑 Temporary Username: <span className="text-blue-300 font-semibold">hacker</span> <br></br>Temporary Password: <span className="text-blue-300 font-semibold">htn2025</span> <br></br>Log in to access exclusive events!
        </p>

        {/* Error Message */}
        {error && <p className="text-red-400 text-sm text-center mb-3">{error}</p>}

        {/* Username Input */}
        <div className="mb-4">
          <input
            className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <input
            className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <motion.button
          className="w-full p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-400 transition-all"
          onClick={handleLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
}
