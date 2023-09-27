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

export default function page() {
  const [friendsState, setFriendsState] = useState<string[] | undefined>(
    undefined
  );

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/friends/${localStorage.getItem(
        "username"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFriendsState(data.friends);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleNavigateToAddNewFriend() {
    window.location.href = "/friends/add";
  }

  return (
    <div className="bg-slate-200 min-h-[calc(100vh-70px)] flex flex-col items-center">
      <h1 className="p-8 text-center font-semibold text-xl">Your Friends:</h1>
      <p className="pb-8">Click on their name and start chatting!</p>
      {friendsState !== undefined ? (
        <ul className="gap-4 flex flex-col">
          <li
            onClick={handleNavigateToAddNewFriend}
            className="cursor-pointer hover:relative hover:top-[1px]"
          >
            <Card className="w-[350px] bg-blue-900 text-white mb-4 shadow-lg">
              <CardHeader>
                <CardTitle className="hover:underline">
                  Add a new friend +
                </CardTitle>
              </CardHeader>
            </Card>
          </li>
          {friendsState?.map((friend) => {
            return (
              <li key={friend}>
                <a href={`/messenger?user=` + friend}>
                  <Card className="w-[350px] border-[1px] border-black shadow-lg">
                    <CardHeader>
                      <CardTitle>{friend}</CardTitle>
                    </CardHeader>
                  </Card>
                </a>
              </li>
            );
          })}
        </ul>
      ) : undefined}
    </div>
  );
}
