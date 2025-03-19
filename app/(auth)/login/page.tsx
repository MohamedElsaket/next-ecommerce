"use client";

import LoginForm from "@/components/LoginForm";
import { useWixClient } from "@/hooks/useWixContext";
import React from "react";

export default function page() {
  const wixClient = useWixClient();

  const isLogged = wixClient.auth.loggedIn();
  console.log(isLogged);
  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mb-8">Log In</h2>
      <LoginForm />
    </div>
  );
}
