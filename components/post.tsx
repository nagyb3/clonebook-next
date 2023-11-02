import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";

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

export default function Post({ PostProp }: { PostProp: PostType }) {
  const [showCommentForm, setShowCommentForm] = React.useState(false);

  const [newComment, setNewComment] = React.useState("");

  const [commentsList, setCommentsList] = React.useState([]);

  const [userLikedThisPost, setUserLikedThisPost] = React.useState(false);

  function onToggleCommentForm() {
    setShowCommentForm(!showCommentForm);
  }

  const onSubmitNewComment = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        comment_author_username: localStorage.getItem("username"),
        text: newComment,
        post_id: PostProp._id,
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
  };

  function handleDeletePost() {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/posts/${PostProp._id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        window.location.reload();
      }
    });
  }

  function handleLikeClick() {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/posts/${PostProp._id}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
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

  return (
    <div className="border-[1px] border-slate-700 p-3 bg-slate-100 shadow-lg rounded">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Button variant="link" className="p-0" asChild>
            <Link
              className="font-semibold"
              // TODO: make the user's profile page
              href={`${process.env.NEXT_PUBLIC_API_URI}/profile/${PostProp.author_username}`}
            >
              @{PostProp.author_username}
            </Link>
          </Button>
          {PostProp.author_username === localStorage.getItem("username") ? (
            <div className="flex items-center gap-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Post</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this post?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will action will
                      permanently delete this post of yours!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>No</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeletePost}>
                      Yes
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <p>Likes: {PostProp.users_who_liked.length}</p>
            </div>
          ) : (
            <div className="flex items-center gap-2" onClick={handleLikeClick}>
              <p className="font-semibold">{PostProp.users_who_liked.length}</p>
              <p>
                {PostProp.users_who_liked.includes(
                  String(localStorage.getItem("username"))
                ) ? (
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 21 19"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"
                    />
                  </svg>
                )}
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg">{PostProp.text}</p>
          <Button
            variant="outline"
            className="block text-sm border-[1px] border-gray-500"
            onClick={() => setShowCommentForm((prev) => !prev)}
          >
            {showCommentForm ? "Hide" : "Send Comment"}
          </Button>
        </div>
      </div>
      <div>
        {showCommentForm && (
          <form onSubmit={onSubmitNewComment} className="flex py-2 gap-8">
            <Input
              autoCapitalize="off"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              type="text"
              name="comment"
              id="comment"
              placeholder="send a comment"
              className="shadow-lg border-[1px] border-slate-700"
            />
            <Button type="submit">SEND</Button>
          </form>
        )}
      </div>
      {PostProp.comments.length > 0 && (
        <div className="pt-3">
          <hr className="my-2 border-gray-700" />
          <ul>
            {PostProp.comments.map((comment) => {
              return (
                <li key={comment._id}>
                  <span className="comment-author">
                    @{comment.comment_author_username}:
                  </span>{" "}
                  {comment.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
