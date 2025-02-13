"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { Bubble } from "pixel-retroui";

export default function LoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return typeof window !== "undefined"
      ? localStorage.getItem("isLoggedIn") === "true"
      : false;
  });

  const router = useRouter();

  useEffect(() => {
    const savedLoginState = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(savedLoginState);
  }, []);

  const handleLoginToggle = () => {
    const newLoginState = !isLoggedIn;
    setIsLoggedIn(newLoginState);
    localStorage.setItem("isLoggedIn", newLoginState.toString());
    router.push(newLoginState ? "/login" : "/logout");
  };

  return (
    <div className="absolute top-4 right-4 z-50 flex flex-col items-end space-y-2 pointer-events-auto">
      {!isLoggedIn && (
        <Bubble
          direction="right"
          bg="#fefcd0"
          textColor="black"
          borderColor="black"
        >
          Sign in to access exclusive events!
        </Bubble>
      )}
      <Button onClick={handleLoginToggle}>
        {isLoggedIn ? "Log Out" : "Log In"}
      </Button>
    </div>
  );
}
