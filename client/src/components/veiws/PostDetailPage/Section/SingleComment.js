import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { addComment } from "../../../../_actions/commentAction";
import LikeDislike from "./LikeDislike";
import ReplyComment from "./ReplyComment";

function SingleComment(props) {
  const dispatch = useDispatch();
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");
  const postId = props.postId;

  console.log("single comment props : ", props.comment.commentId);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();

    console.log("props.comment.commentId : ", props.comment.commentId);
    const variable = {
      content: CommentValue,
      postId: postId,
      responseToCommentId: props.comment.commentId,
    };
    dispatch(addComment(variable)).then((res) => {
      //console.log("res.payload comment: ", res.payload.comment);
      if (res.payload.success) {
        setCommentValue("");
        setOpenReply(false);
        props.setComments(res.payload.comment);
      } else {
        alert("댓글을 저장하지 못했습니다.");
      }
    });
  };
  const onClick = () => {
    setOpenReply(!OpenReply);
  };

  return (
    <div style={{ paddingLeft: "2%" }}>
      {/* Comment Listis */}
      {props.comment.responseToCommentId === null && (
        <div>
          <span>{props.comment.name}</span>
          <span> : {props.comment.content}</span>
          <br />
          <div className="d-flex">
            <span style={{ cursor: "pointer" }} onClick={onClick}>
              Reply
            </span>
            <LikeDislike commentId={props.comment.commentId} />
          </div>
        </div>
      )}

      {/* Root Comment Form */}
      {OpenReply && (
        <React.Fragment>
          <form className="d-flex w-100 ps-3" onSubmit={onSubmitHandle}>
            <textarea
              style={{ width: "80%" }}
              onChange={handleChange}
              value={CommentValue}
              placeholder="댓글을 작성해주세요."
            />
            <br />
            <button className="m-auto" style={{ width: "15.5%" }} type="submit">
              댓글 작성
            </button>
          </form>
        </React.Fragment>
      )}
    </div>
  );
}

export default withRouter(SingleComment);
