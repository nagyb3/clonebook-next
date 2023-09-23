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
        <ul className="">
          {friendsState?.map((friend) => {
            return (
              <li>
                {/* <a href={`/messenger?user=` + friend}>{friend}</a> */}
                <a href={`/messenger?user=` + friend}>
                  <Card className="w-[350px]">
                    <CardHeader>
                      <CardTitle>
                        {/* <a href={`/messenger?user=` + friend}>{friend}</a> */}
                        {friend}
                      </CardTitle>
                      {/* <CardDescription>bio...</CardDescription> */}
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
