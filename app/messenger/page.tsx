"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

type MessageType = {
  receiver_username: string;
  sender_username: string;
  text: string;
  __v: number;
  _id: number;
  creation_date: Date;
};

export default function page() {
  const [userToChatWith, setUserToChatWith] = useState<string | undefined>(
    undefined
  );

  const [newMessageText, setNewMessageText] = React.useState<string>("");

  const [messageList, setMessagesList] = React.useState<MessageType[]>([]);

  React.useEffect(() => {
    let params = new URLSearchParams(document.location.search);
    const userSearchParam: string | null = params.get("user");
    if (userSearchParam) {
      setUserToChatWith(userSearchParam);
    }
  }, []);

  useEffect(() => {
    if (userToChatWith && localStorage.getItem("username") !== null) {
      fetchChat();
    }
  }, [userToChatWith]);

  const fetchChat = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/chat`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        req_user: localStorage.getItem("username"),
        rec_user: userToChatWith,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMessagesList(data.messages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userToChatWith && newMessageText) {
      fetch(`${process.env.NEXT_PUBLIC_API_URI}/messages/create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          sender_username: localStorage.getItem("username"),
          receiver_username: userToChatWith,
          text: newMessageText,
        }),
      })
        .then((response) => {
          if (response.ok) {
            setNewMessageText("");
            fetchChat();
          }
        })
        .then((data) => {})
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="bg-slate-200 min-h-[calc(100vh-70px)]">
      {userToChatWith ? (
        <div className="min-h-[calc(100vh-70px)] flex flex-col">
          <div className="bg-slate-300 h-[70px] border-b-2 border-black flex items-center pl-6 text-xl">
            <p>{userToChatWith}</p>
          </div>
          <div className="flex-1 p-5 flex flex-col gap-3">
            {messageList.map((message: MessageType) => {
              return (
                <div
                  key={message._id}
                  className={
                    message.sender_username === localStorage.getItem("username")
                      ? "bg-blue-700 text-white rounded p-2 w-fit self-end shadow-[3px_3px_6px_rgba(0,0,0,0.5)]"
                      : "bg-gray-300 text-black rounded p-2 w-fit border-[1px] border-gray-500 shadow-[3px_3px_6px_rgba(0,0,0,0.3)]"
                  }
                >
                  {message.text}
                </div>
              );
            })}
          </div>
          <div className="">
            <form className="m-3 flex" onSubmit={(e) => submitMessage(e)}>
              <Input
                onChange={(e) => setNewMessageText(e.target.value)}
                value={newMessageText}
                type="text"
                className="shadow-lg border-[1px] border-slate-700"
                placeholder="Send a message..."
              />
              <Button
                type="submit"
                className="font-semibold text-xl hover:relative hover:top-[1px]"
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-full p-6">
          <p>login first</p>
        </div>
      )}
    </div>
  );
}
