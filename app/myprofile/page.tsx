"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

export default function page() {
  const [thisUser, setThisUser] = useState<string | undefined>(undefined);

  const [editingBio, setEditingBio] = useState<boolean>(false);

  const [bio, setBio] = useState<string>("");

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
        setBio(data.user.bio);
      })
      .catch((error) => {
        console.error(error);
      });
    // setBio(thisUser.bio)
    setThisUser(String(localStorage.getItem("username")));
  }, []);

  function submitEditedBio() {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/${thisUser}/bio`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        bio: bio,
        username: thisUser,
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

  function handleEditBio(
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
          <div>
            <Input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <Button onClick={(e) => handleEditBio(e)}>Submit bio!</Button>
            <Button variant="destructive" onClick={(e) => handleEditBio(e)}>
              Cancel
            </Button>
          </div>
        ) : (
          <div>
            <p className="my-4 border-[1px] border-black p-3 bg-white">{bio}</p>
            <Button onClick={(e) => handleEditBio(e)}>Edit your bio!</Button>
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
