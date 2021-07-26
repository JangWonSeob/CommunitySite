import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { addComment } from "../../../../_actions/commentAction";

function Comment(props) {
  const dispatch = useDispatch();
  const [CommentValue, setCommentValue] = useState("");

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();

    const variable = {
      content: CommentValue,
      postId: props.postId,
    };
    dispatch(addComment(variable)).then((res) => {
      // console.log("res.payload comment: ", res.payload.success);
      if (res.payload.success) {
        setCommentValue("");
      } else {
        alert("댓글 정보를 가져오지 못했습니다.");
      }
    });
  };
  return (
    <div>
      <br />
      <p> 댓 글 </p>
      {/* Comment Listis */}
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
