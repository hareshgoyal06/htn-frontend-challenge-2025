"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    async function logoutUser() {
      await fetch("/api/logout", { method: "GET" });
      router.push("/"); // Redirect to home page after logout
    }

    logoutUser();
  }, [router]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Logging out...</h1>
    </div>
  );
}
