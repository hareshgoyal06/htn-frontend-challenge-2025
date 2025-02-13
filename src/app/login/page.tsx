"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Login</h1>
      <input
        className="border p-2 my-2 w-full"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 my-2 w-full"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
