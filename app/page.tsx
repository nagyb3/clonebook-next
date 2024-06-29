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
  users_who_liked: string[];
};

export default function Page() {
  const [allPosts, setAllPosts] = useState<undefined | PostType[]>(undefined);

  const [inputState, setInputState] = useState<string>("");

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [isPostsLoading, setIsPostsLoading] = useState(true);

  const handleLoadPosts = () => {
    setIsPostsLoading(true);

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
      .catch((error) => console.error(error))
      .finally(() => setIsPostsLoading(false));
  };

  useEffect(() => {
    if (localStorage.getItem("username") === null) {
      setIsLoggedIn(false);
    }
    handleLoadPosts();
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

  console.log(isPostsLoading);

  return (
    <div className="min-h-[calc(100vh-70px)] bg-slate-200 flex flex-col items-center">
      {isLoggedIn && !isPostsLoading ? (
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
      <div className="flex flex-col gap-4 mt-8 w-full px-8 max-w-[800px] items-center">
        {isPostsLoading ? (
          <svg
            aria-hidden="true"
            className="mt-8 inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        ) : allPosts !== undefined ? (
          allPosts.map((post: PostType) => {
            return <Post key={post._id} PostProp={post} />;
          })
        ) : (
          <p className="text-center">Be the first the make a post!</p>
        )}
      </div>
    </div>
  );
}
