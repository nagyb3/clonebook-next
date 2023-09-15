"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type PostType = {
  authorid: string;
  creation_date: Date;
  text: string;
  __v: number;
  _id: string;
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

  return (
    <div className="min-h-[calc(100vh-70px)] bg-slate-200">
      <div className="flex gap-4 p-4">
        <Input type="text" id="make-post" placeholder="Say Something!" />
        <Button className="text-xl">Post</Button>
      </div>
      <div>
        {allPosts !== undefined
          ? allPosts.map((elem) => {
              return <p>{elem.text}</p>;
            })
          : undefined}
      </div>
    </div>
  );
}
