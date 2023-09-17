"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [usernameState, setUsernameState] = React.useState<string>("");
  const [passwordState, setPasswordState] = React.useState<string>("");

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsernameState(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordState(e.target.value);
  }

  function handleLogin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (usernameState !== undefined && passwordState !== undefined) {
      fetch(`${process.env.API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameState,
          password: passwordState,
        }),
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            window.location.href = "/";
            localStorage.setItem("username", usernameState);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div className="flex flex-col items-center bg-slate-200 min-h-[calc(100vh-70px)]">
      <h1 className="mt-8 text-xl font-bold">Login</h1>
      <form className="mt-16 flex w-[50vw] flex-col items-center justify-center gap-8">
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
        <Button onClick={(e) => handleLogin(e)}>Login</Button>
      </form>
      <p className="mt-8">
        Don't have an account yet?{" "}
        <a
          className="font-semibold text-blue-800 underline hover:relative hover:top-[1px]"
          href="/signup"
        >
          Sign up now!
        </a>
      </p>
    </div>
  );
}
