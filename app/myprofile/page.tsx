"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export default function page() {
  function handleLogout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div className="bg-slate-200 gap-16 min-h-[calc(100vh-70px)] flex  flex-col items-center p-8">
      <h1 className="text-lg font-bold">Your Profile</h1>
      <Button
        variant="destructive"
        className="font-semibold text-lg"
        onClick={handleLogout}
      >
        Log out of your account
      </Button>
    </div>
  );
}
