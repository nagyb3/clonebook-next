"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

export default function page() {
  const [thisUser, setThisUser] = useState<string | undefined>(undefined);

  function handleLogout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  useEffect(() => {
    setThisUser(String(localStorage.getItem("username")));
  }, []);

  return (
    <div className="bg-slate-200 gap-16 min-h-[calc(100vh-70px)] flex  flex-col items-center p-8">
      <h1 className="text-lg font-bold">Your Profile</h1>
      <p className="text-lg">
        You are logged in as: <span className="font-bold">{thisUser}</span>
      </p>
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
