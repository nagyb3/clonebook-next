"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Page() {
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const secondPasswordRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);

  const [showPasswordMisMatch, setShowPasswordMismatch] =
    React.useState<boolean>(false);

  function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (usernameRef.current !== null && emailRef.current !== null) {
      if (passwordRef.current !== null && secondPasswordRef.current !== null) {
        if (passwordRef.current.value === secondPasswordRef.current.value) {
          fetch(`${process.env.NEXT_PUBLIC_API_URI}/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: usernameRef.current.value,
              password: passwordRef.current.value,
              second_password: secondPasswordRef.current.value,
              email: emailRef.current.value,
            }),
          })
            .then((response) => {
              if (response.ok) {
                window.location.href = "/login";
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          setShowPasswordMismatch(true);
        }
      }
    }
  }

  return (
    <div className="flex flex-col items-center bg-slate-200 min-h-[calc(100vh-70px)]">
      <h1 className="mt-8 text-xl font-bold">Sign up for clonebook</h1>
      <form
        className="mt-16 flex flex-col items-center justify-center gap-8"
        onSubmit={(e) => handleSignup(e)}
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
          <Label className="mr-4" htmlFor="email">
            Email:
          </Label>
          <Input
            className="shadow-lg border-[1px] border-slate-700"
            type="email"
            name="email"
            id="email"
            placeholder="Your email.."
            ref={emailRef}
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
            ref={secondPasswordRef}
          />
        </div>
        <Button type="submit">Sign up</Button>
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
