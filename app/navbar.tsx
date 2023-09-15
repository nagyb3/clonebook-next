"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type NavbarProps = {
  isLoggedIn: boolean;
};

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("username") !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="flex justify-between bg-slate-400 px-6 sm:px-12 py-8 items-center h-[70px]">
      <h1 className="text-xl font-semibold">
        <a href="/">clonebook</a>
      </h1>
      {isLoggedIn ? (
        <ul className="flex justify-between items-center sm:gap-8 gap-4">
          <li className="">
            <Button>Friends</Button>
          </li>
          <Button variant="secondary" asChild>
            <Link href="/myprofile">My Profile</Link>
          </Button>
        </ul>
      ) : (
        <ul>
          <li>
            <Button asChild>
              <Link href="/login">LOG IN</Link>
            </Button>
          </li>
        </ul>
      )}
    </div>
  );
}
