"use client";

import React from "react";
import {
  isObjectLiteralElement,
  isStringLiteralOrJsxExpression,
} from "typescript";

export default function Login() {
  const [usernameState, setUsernameState] = React.useState<undefined | string>(
    undefined
  );
  const [passwordState, setPasswordState] = React.useState<undefined | string>(
    undefined
  );

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsernameState(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordState(e.target.value);
  }

  console.log(process.env.API_URL);

  function handleLogin() {
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
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-8 text-xl font-bold">Login</h1>
      <form className="mt-16 flex w-[50vw] flex-col items-center justify-center gap-8">
        <div>
          <label className="mr-4" htmlFor="username">
            Username:
          </label>
          <input
            className="border-[1px] border-black p-[4px]"
            type="text"
            name="username"
            id="username"
            placeholder="Your username.."
            onChange={(e) => handleUsernameChange(e)}
            value={usernameState}
          />
        </div>
        <div>
          <label htmlFor="password" className="mr-4">
            Password:
          </label>
          <input
            className="border-[1px] border-black p-[4px]"
            type="password"
            name="password"
            id="password"
            placeholder="Your password.."
            onChange={(e) => handlePasswordChange(e)}
            value={passwordState}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="rounded border-[1px] border-black bg-blue-200 p-2"
          onClick={handleLogin}
        />
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
