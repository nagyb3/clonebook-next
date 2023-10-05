"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

export default function page() {
  const [thisUser, setThisUser] = useState<string | undefined>(undefined);

  const [editingBio, setEditingBio] = useState<boolean>(false);

  const [bioCurrent, setBioCurrent] = useState<string>("");

  const [bioInput, setBioInput] = useState<string>("");

  function handleLogout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/users/${localStorage.getItem(
        "username"
      )}/bio`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBioCurrent(data.user.bio);
        setBioInput(data.user.bio);
      })
      .catch((error) => {
        console.error(error);
      });
    setThisUser(String(localStorage.getItem("username")));
  }, []);

  function submitEditedBio(e: React.SyntheticEvent) {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/${thisUser}/bio`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        bio: bioInput,
      }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleEditBioButtonClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    setEditingBio((prev) => !prev);
  }

  return (
    <div className="bg-slate-200 gap-16 min-h-[calc(100vh-70px)] flex  flex-col items-center p-8">
      <h1 className="text-lg font-bold">Your Profile</h1>
      <p className="text-lg">
        You are logged in as: <span className="font-bold">{thisUser}</span>
      </p>
      <div>
        <h2 className="text-xl font-semibold">Your Bio:</h2>
        {editingBio ? (
          <form onSubmit={(e) => submitEditedBio(e)}>
            <Input
              type="text"
              value={bioInput}
              onChange={(e) => setBioInput(e.target.value)}
            />
            <Button>Submit bio!</Button>
            <Button
              variant="destructive"
              onClick={(e) => handleEditBioButtonClick(e)}
            >
              Cancel
            </Button>
          </form>
        ) : (
          <div>
            <p className="my-4 border-[1px] border-black p-3 bg-white">
              {bioCurrent}
            </p>
            <Button onClick={(e) => handleEditBioButtonClick(e)}>
              Edit your bio!
            </Button>
          </div>
        )}
      </div>
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
