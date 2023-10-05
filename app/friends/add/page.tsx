"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Allura, News_Cycle } from "next/font/google";

export default function Page() {
  const [nameInput, setNameInput] = useState<string>("");

  const [errorState, setErrorState] = useState<string>("");

  const [successState, setSuccessState] = useState<string>("");

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [allUsernames, setAllUsernames] = useState<string[]>([]);

  function handleSendFriendReq(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nameInput !== "" && localStorage.getItem !== null) {
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
        .catch((error) => {
          console.error(error);
        });
    }
  }

  useEffect(() => {
    fetch(`${process.env.API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setAllUsernames(data.all_usernames);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (errorState !== "") {
      setErrorState("");
    }
    setNameInput(e.target.value);
    if (allUsernames !== undefined) {
      const newSuggestions = allUsernames;
      const filteredSuggestions = newSuggestions.filter((suggestion) => {
        return suggestion.toLowerCase().indexOf(nameInput.toLowerCase()) > -1;
      });
      setSuggestions(filteredSuggestions);
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
            autoComplete="off"
            className="shadow-lg border-[1px] border-slate-700"
            type="text"
            name="new-friend"
            id="new-friend"
            placeholder="Enter the name of the new friend!"
            onChange={(e) => handleInputChange(e)}
            value={nameInput}
          />
        </div>
        <Button className="w-full bg-blue-900">ADD FRIEND</Button>
        {suggestions.length > 0 && (
          <div className="flex gap-8 flex-col items-center">
            <p>Suggestions:</p>
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
      <p className="text-red-800 font-bold">{errorState}</p>
      <p className="text-green-800 font-bold">{successState}</p>
    </div>
  );
}
