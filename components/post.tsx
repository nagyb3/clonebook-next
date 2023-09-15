import React from "react";
// import dateFormat from "dateformat";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import { db, auth } from "../App";
// import { confirmAlert } from "react-confirm-alert"; // Import
// import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

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

  console.log(PostProp);

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

  // function thisPostHasComment() {
  //   for (let i = 0; i < commentsList.length; i++) {
  //     if (commentsList[i].postId === PostProp.id) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  const onDeleteMessage = () => {
    //use popup to accept to delete the message
  };

  return (
    <div className="border-[1px] border-slate-700 p-3 bg-slate-100 shadow-lg rounded">
      <p>{PostProp.text}</p>

      {/* {props.showDeleteButton && (
        <div className="delete-post-container">
          <button onClick={onDeleteMessage} className="delete-post">
            DELETE
          </button>
        </div>
      )} */}
      <div className="message-card-container">
        <div className="top-row">
          {/* <p className="display-name">@{post.authorDisplayName}</p> */}
          <p>
            {/* {dateFormat(post.createdAt.toDate(), "yyyy mmmm dS, HH:MM:ss")} */}
          </p>
        </div>
        {/* <p className="message">{post.message}</p> */}

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
