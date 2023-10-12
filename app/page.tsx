"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Post from "@/components/post";

type CommentType = {
  comment_author_username: string;
  post_id: string;
  text: string;
  __v: number;
  _id: string;
  created_at: Date;
};

type PostType = {
  author_username: string;
  creation_date: Date;
  text: string;
  __v: number;
  _id: string;
  comments: CommentType[];
  numberOfLikes: number;
};

export default function Page() {
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
        let allPostsList = data.all_posts;
        allPostsList.sort((a: PostType, b: PostType) => {
          return (
            new Date(b.creation_date).getTime() -
            new Date(a.creation_date).getTime()
          );
        });
        setAllPosts(allPostsList);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleChangeState(e: React.ChangeEvent<HTMLInputElement>) {
    setInputState(e.target.value);
  }

  function handleSubmitPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputState !== "") {
      fetch(`${process.env.NEXT_PUBLIC_API_URI}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
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
        <form
          onSubmit={(e) => handleSubmitPost(e)}
          className="text-center flex gap-4 p-4 max-w-[700px] w-full"
        >
          <Input
            autoComplete="off"
            type="text"
            id="make-post"
            placeholder="Say Something!"
            className="shadow-lg border-[1px] border-slate-700"
            onChange={(e) => handleChangeState(e)}
            value={inputState}
          />
          <Button type="submit" className="text-xl shadow-lg">
            Post
          </Button>
        </form>
      ) : undefined}
      <div className="flex flex-col gap-4 mt-8 w-full px-8 max-w-[800px]">
        {allPosts !== undefined
          ? allPosts.map((post: PostType) => {
              return <Post key={post._id} PostProp={post} />;
            })
          : undefined}
      </div>
    </div>
  );
}
