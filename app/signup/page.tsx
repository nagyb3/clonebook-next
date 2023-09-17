"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ParkingSquare } from "lucide-react";

export default function page() {
  const [usernameState, setUsernameState] = React.useState<string>("");
  const [passwordState, setPasswordState] = React.useState<string>("");

  const [secondPasswordState, setSecondPasswordState] =
    React.useState<string>("");

  const [showPasswordMisMatch, setShowPasswordMismatch] =
    React.useState<boolean>(false);

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsernameState(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordState(e.target.value);
  }

  function handleSecondPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSecondPasswordState(e.target.value);
  }

  function handleSignup() {
    if (passwordState === secondPasswordState && passwordState !== undefined) {
      fetch(`${process.env.API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameState,
          password: passwordState,
          second_password: secondPasswordState,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setShowPasswordMismatch(true);
    }
  }

  return (
    <div className="flex flex-col items-center bg-slate-200 min-h-[calc(100vh-70px)]">
      <h1 className="mt-8 text-xl font-bold">Sign up for clonebook</h1>
      <form
        className="mt-16 flex flex-col items-center justify-center gap-8"
        onSubmit={(e) => e.preventDefault}
      >
        <div>
          <Label className="mr-4" htmlFor="username">
            Username:
          </Label>
          <Input
            className="shadow-lg border-[1px] border-slate-700"
            type="text"
            name="username"
            id="username"
            placeholder="Your username.."
            onChange={(e) => handleUsernameChange(e)}
            value={usernameState}
          />
        </div>
        <div>
          <Label htmlFor="password" className="mr-4">
            Password:
          </Label>
          <Input
            className="shadow-lg border-[1px] border-slate-700"
            type="password"
            name="password"
            id="password"
            placeholder="Your password.."
            onChange={(e) => handlePasswordChange(e)}
            value={passwordState}
          />
        </div>
        <div>
          <Label htmlFor="second-password" className="mr-4">
            Comfirm Password:
          </Label>
          <Input
            className="shadow-lg border-[1px] border-slate-700"
            type="password"
            name="comfirm-password"
            id="comfirm-password"
            placeholder="Comfirm password.."
            onChange={(e) => handleSecondPasswordChange(e)}
            value={secondPasswordState}
          />
        </div>
        <Button onClick={handleSignup}>Sign up</Button>
        {showPasswordMisMatch ? (
          <p className="text-red-700 font-semibold">
            Make sure the two password fields match each other!
          </p>
        ) : undefined}
      </form>
      <p className="mt-8">
        Already have an account?{" "}
        <a
          className="font-semibold text-blue-800 underline hover:relative hover:top-[1px]"
          href="/login"
        >
          Log in
        </a>
      </p>
    </div>
  );
}
