"use client";

import React, { useEffect, useState } from "react";

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
        console.log(data);
        setFriendsState(data.friends);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="bg-slate-200 min-h-[calc(100vh-70px)] flex flex-col items-center">
      <h1 className="p-8 text-center font-semibold text-xl">Your Friends:</h1>
      <p className="pb-16">Click on their name and start chatting!</p>
      {friendsState !== undefined ? (
        <ul className="list-disc">
          {friendsState?.map((friend) => {
            return (
              <li className="underline">
                <a href={`/messenger?user=` + friend}>{friend}</a>
              </li>
            );
          })}
        </ul>
      ) : undefined}
    </div>
  );
}
