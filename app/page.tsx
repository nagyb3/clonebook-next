"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UIEventHandler, useEffect, useState } from "react";
import Post from "@/components/post";
import { UnscopedEmitHelper } from "typescript";

type PostType = {
  author_username: string;
  creation_date: Date;
  text: string;
  __v: number;
  _id: string;
  comments: string[];
  numberOfLikes: number;
};

export default function Home() {
  const [allPosts, setAllPosts] = useState<undefined | PostType[]>(undefined);

  const [inputState, setInputState] = useState<string>("");

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("username") === null) {
      setIsLoggedIn(false);
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/posts`)
      .then((response) => response.json())
      .then((data) => {
        setAllPosts(data.all_posts);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleChangeState(e: React.ChangeEvent<HTMLInputElement>) {
    setInputState(e.target.value);
  }

  function handleSubmitPost() {
    if (inputState !== "") {
      fetch(`${process.env.NEXT_PUBLIC_API_URI}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author_username: localStorage.getItem("username"),
          text: inputState,
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
  }

  return (
    <div className="min-h-[calc(100vh-70px)] bg-slate-200 flex flex-col items-center">
      {isLoggedIn ? (
        <div className="text-center flex gap-4 p-4 max-w-[700px] w-full">
          <Input
            type="text"
            id="make-post"
            placeholder="Say Something!"
            className="shadow-lg border-[1px] border-slate-700"
            onChange={(e) => handleChangeState(e)}
            value={inputState}
          />
          <Button className="text-xl shadow-lg" onClick={handleSubmitPost}>
            Post
          </Button>
        </div>
      ) : undefined}
      <div className="flex flex-col gap-4 mt-8 w-full px-8 max-w-[800px]">
        {allPosts !== undefined
          ? allPosts.map((post: PostType) => {
              // return <p>{post.text}</p>;
              return <Post key={post._id} PostProp={post} />;
            })
          : undefined}
      </div>
    </div>
  );
}
