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
import { useRouter } from "next/navigation";

type PostType = {
  author_username: string;
  creation_date: Date;
  text: string;
  __v: number;
  _id: string;
  comments: string[];
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
    //
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

  // console.log(`${process.env.NEXT_PUBLIC_API_URI}/posts/${PostProp._id}`);

  // function thisPostHasComment() {
  //   for (let i = 0; i < commentsList.length; i++) {
  //     if (commentsList[i].postId === PostProp.id) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  return (
    <div className="border-[1px] border-slate-700 p-3 bg-slate-100 shadow-lg rounded">
      <div className="flex justify-between">
        <Button variant="link" className="p-0" asChild>
          <Link href="https://telex.hu">@{PostProp.author_username}</Link>
        </Button>
        {PostProp.author_username === localStorage.getItem("username") ? (
          // <button>DELETE</button>
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
      <p>{PostProp.text}</p>
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
          {/* <button className="hide-show" onClick={onToggleCommentForm}>
            {" "}
            {showCommentForm ? "HIDE" : "SEND COMMENT"}
          </button> */}
        </div>

        {showCommentForm && (
          <form onSubmit={onSubmitNewComment} className="comment">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              type="text"
              name="comment"
              id="comment"
              placeholder="send a comment"
            />
            <input
              type="submit"
              value="Send Comment"
              className="send-comment"
            />
          </form>
        )}
      </div>
      {/* {thisPostHasComment() && (
        <div className="comments-container">
          <ul>
            {commentsList.map((comment) => {
              if (comment.postId === PostProp.id) {
                return (
                  <li key={comment.id}>
                    <span className="comment-author">
                      @{comment.authorDisplayName}:
                    </span>{" "}
                    {comment.text}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      )} */}
    </div>
  );
}
