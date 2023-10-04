import React from "react";
// import dateFormat from "dateformat";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
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
  numberOfLikes: number;
};

export default function Post({ PostProp }: { PostProp: PostType }) {
  // const [currentUserLikedThisMessage, setCurrentUserLikedThisMessage] =
  //   React.useState();

  const [showCommentForm, setShowCommentForm] = React.useState(false);

  const [newComment, setNewComment] = React.useState("");

  const [commentsList, setCommentsList] = React.useState([]);

  const clickLikeButton = async () => {
    //
  };

  function onToggleCommentForm() {
    setShowCommentForm(!showCommentForm);
  }

  const getCommentsList = async () => {
    //
  };

  React.useEffect(() => {
    getCommentsList();
  }, []);
  //sort for OLDEST FIRST
  // function compare(a, b) {
  //   if (a.createdAt.seconds < b.createdAt.seconds) {
  //     return -1;
  //   }
  //   if (a.createdAt.seconds > b.createdAt.seconds) {
  //     return 1;
  //   }
  //   return 0;
  // }

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

  console.log(PostProp.comments);

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
          ) : undefined}
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
      <div className="message-card-container">
        <div className="bottom-row">
          <div onClick={clickLikeButton}>
            {/* {currentUserLikedThisMessage ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )} */}
          </div>
          <p className="number-of-likes" onClick={clickLikeButton}>
            {/* {post.numberOfLikes} */}
          </p>
        </div>

        {showCommentForm && (
          <form onSubmit={onSubmitNewComment} className="flex py-2 gap-8">
            <Input
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
