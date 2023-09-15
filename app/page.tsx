"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Post from "@/components/post";

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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/posts`)
      .then((response) => response.json())
      .then((data) => {
        setAllPosts(data.all_posts);
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(allPosts);

  return (
    <div className="min-h-[calc(100vh-70px)] bg-slate-200 flex flex-col items-center">
      <div className="text-center flex gap-4 p-4 max-w-[700px] w-full">
        <Input
          type="text"
          id="make-post"
          placeholder="Say Something!"
          className="shadow-lg border-[1px] border-slate-700"
        />
        <Button className="text-xl shadow-lg">Post</Button>
      </div>
      <div className="flex flex-col gap-4 mt-8 w-full px-8">
        {allPosts !== undefined
          ? allPosts.map((post: PostType) => {
              // return <p>{post.text}</p>;
              return <Post PostProp={post} />;
            })
          : undefined}
      </div>
    </div>
  );
}
