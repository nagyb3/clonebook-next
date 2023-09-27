"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function page() {
  const [friendsState, setFriendsState] = useState<string[] | undefined>(
    undefined
  );
  const [nameInput, setNameInput] = useState<string>("");

  const [errorState, setErrorState] = useState<string>("");

  const [successState, setSuccessState] = useState<string>("");

  useEffect(() => {
    // fetch(
    //   `${process.env.NEXT_PUBLIC_API_URI}/friends/${localStorage.getItem(
    //     "username"
    //   )}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setFriendsState(data.friends);
    //   })
    //   .catch((error) => console.error(error));
  }, []);

  function handleSendFriendReq(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      nameInput !== undefined &&
      nameInput !== undefined &&
      localStorage.getItem !== null
    ) {
      fetch(`${process.env.API_URL}/friends/add`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          req_username: nameInput,
          second_username: localStorage.getItem("username"),
        }),
      })
        .then((response) => {
          if (response.ok) {
            window.location.href = "/friends";
            setSuccessState("Friend added!!");
            setErrorState("");
          } else {
            setErrorState("You have not given a correct username!");
          }
          return response.json();
        })
        .then((data) => {
          //   localStorage.setItem("token", data.token);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div className="bg-slate-200 min-h-[calc(100vh-70px)] flex flex-col items-center">
      <h1 className="p-8 text-center font-semibold text-xl">
        Add a new friend...
      </h1>
      <form
        className="flex items-center gap-8 flex-col"
        onSubmit={(e) => handleSendFriendReq(e)}
      >
        <div>
          <Label htmlFor="new-friend">New friend&apos;s name:</Label>
          <Input
            className="shadow-lg border-[1px] border-slate-700"
            type="text"
            name="new-friend"
            id="new-friend"
            placeholder="Enter the name of the new friend!"
            onChange={(e) => setNameInput(e.target.value)}
            value={nameInput}
          />
        </div>
        <Button className="w-full bg-blue-900">ADD FRIEND</Button>
      </form>
      <p className="text-red-800 font-bold">{errorState}</p>
      <p className="text-green-800 font-bold">{successState}</p>
    </div>
  );
}
