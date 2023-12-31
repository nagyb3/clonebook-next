"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Page() {
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const [showError, setShowError] = React.useState<boolean>(false);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (usernameRef.current !== null && passwordRef.current !== null) {
      fetch(`${process.env.NEXT_PUBLIC_API_URI}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
      })
        .then((response) => {
          if (response.ok) {
            window.location.href = "/";
            if (usernameRef.current !== null) {
              localStorage.setItem("username", usernameRef.current.value);
            }
          } else {
            setShowError(true);
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("token", data.token);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div className="flex flex-col items-center bg-slate-200 min-h-[calc(100vh-70px)]">
      <h1 className="mt-8 text-xl font-bold">Login</h1>
      <form
        className="mt-16 flex w-[50vw] flex-col items-center justify-center gap-8"
        onSubmit={(e) => handleFormSubmit(e)}
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
            ref={usernameRef}
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
            ref={passwordRef}
          />
        </div>
        <Button>Login</Button>
      </form>
      {showError ? (
        <p className="mt-8 text-red-700 font-semibold text-lg">
          Incorrect username or password!
        </p>
      ) : undefined}
      <p className="mt-8">
        Don&apos;t have an account yet?{" "}
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
