import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { addComment } from "../../../../_actions/commentAction";
import Like from "./LikeDislike";

function SingleComment(props) {
  const dispatch = useDispatch();
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");
  const postId = props.postId;

  //console.log("single comment props : ", props.comment);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();

    const variable = {
      content: CommentValue,
      postId: postId,
    };
    dispatch(addComment(variable)).then((res) => {
      //console.log("res.payload comment: ", res.payload.comment);
      if (res.payload.success) {
        setCommentValue("");
        props.refreshFunction(res.payload.comment);
      } else {
        alert("댓글을 저장하지 못했습니다.");
      }
    });
  };
  const onClick = () => {
    setOpenReply(!OpenReply);
  };
  return (
    <div style={{ paddingLeft: "2%" }} className="w-100">
      {/* Comment Listis */}
      <div>
        <span>{props.comment.name}</span>
        <span> : {props.comment.content}</span>
        <br />
        <div className="d-flex">
          <span onClick={onClick}>Reply</span>
          <Like commentId={props.comment.commentId} />
        </div>
      </div>
      {/* Root Comment Form */}
      {OpenReply && (
        <form
          className="d-flex ml-5 w-100"
          style={{ marginLeft: "10px", width: "100%" }}
          onSubmit={onSubmitHandle}
        >
          <textarea
            style={{ paddingLeft: "2%" }}
            onChange={handleChange}
            value={CommentValue}
            placeholder="댓글을 작성해주세요"
          ></textarea>
          <br />
          <botton onClick={onSubmitHandle}>Submit</botton>
        </form>
      )}
    </div>
  );
}

export default withRouter(SingleComment);
