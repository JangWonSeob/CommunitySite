import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { addComment } from "../../../../_actions/commentAction";

function SingleComment(props) {
  const dispatch = useDispatch();
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");
  const postId = props.postId;

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
      console.log("res.payload comment: ", res.payload.comment);
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
    <div>
      {/* Comment Listis */}
      <div>
        <span>{props.comment.writer}</span>
        <span> : {props.comment.content}</span>
        <br />
        <span onClick={onClick}>Reply</span>
      </div>
      {/* Root Comment Form */}
      {OpenReply && (
        <form onSubmit={onSubmitHandle}>
          <textarea
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
