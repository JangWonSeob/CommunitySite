import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { addComment } from "../../../../_actions/commentAction";
import SigngleComment from "./SigngleComment";
import ReplyComment from "./ReplyComment";

function Comment(props) {
  const dispatch = useDispatch();
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
      // console.log("res.payload comment: ", res.payload.success);
      if (res.payload.success) {
        setCommentValue("");
        props.refreshFuncion(res.payload.comment);
      } else {
        alert("댓글을 저장하지 못했습니다.");
      }
    });
  };
  return (
    <div>
      <br />
      <p> 댓 글 </p>
      {/* Comment Listis */}
      {props.commentList &&
        props.commentList.map((comment, index) => (
          <React.Fragment>
            <SigngleComment />
            <ReplyComment />
          </React.Fragment>
        ))}
      {/* Root Comment Form */}
      <form onSubmit={onSubmitHandle}>
        <textarea
          onChange={handleChange}
          value={CommentValue}
          placeholder="댓글을 작성해주세요"
        ></textarea>
        <br />
        <botton onClick={onSubmitHandle}>Submit</botton>
      </form>
    </div>
  );
}

export default withRouter(Comment);
