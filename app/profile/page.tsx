"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import Post, { PostType } from "@/components/post";

type userProfileType = {
  _id: string;
  friends: string[];
  __v: number;
  email: string;
  bio: string;
  username: string;
};

export default function Page() {
  const [userProfileData, setUserProfileData] = React.useState<
    userProfileType | undefined
  >(undefined);

  const [reqUserPosts, setRequserPosts] = React.useState<PostType[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("username");
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/` + username, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserProfileData(data.userProfile);
        setRequserPosts(data.reqUserPosts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleAddAsFriend() {
    //
  }

  return (
    <div className="bg-slate-200 gap-8 min-h-[calc(100vh-70px)] flex flex-col items-center p-8">
      <h1 className="font-semibold text-2xl">@{userProfileData?.username}</h1>
      <div className="flex items-center">
        <p className="text-xl m-2">Bio:</p>
        <p className="m-2">{userProfileData?.bio}</p>
      </div>
      {userProfileData?.username !== localStorage.getItem("username") &&
      localStorage.getItem("username") !== null ? (
        <Button
          onClick={handleAddAsFriend}
          variant="secondary"
          className="bg-slate-300 border-[1px] border-black"
        >
          Add as a friend!
        </Button>
      ) : undefined}
      <div>
        <p className="text-xl m-2">List of friends:</p>
        <ul className="list-disc">
          {userProfileData?.friends.map((friend) => {
            return <li key={friend}>{friend}</li>;
          })}
        </ul>
      </div>
      <h2 className="text-xl mt-8">
        @{userProfileData?.username}&apos;s Posts:
      </h2>
      <div className="flex flex-col gap-4 mt-8 w-full px-8 max-w-[800px]">
        {reqUserPosts?.map((post: PostType) => {
          return <Post key={post._id} PostProp={post} />;
        })}
      </div>
    </div>
  );
}
