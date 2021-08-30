import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { addComment, getComment } from "../../../../_actions/commentAction";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

function Comment(props) {
  const dispatch = useDispatch();
  const [Comments, setComments] = useState([]);
  const [CommentValue, setCommentValue] = useState("");
  const postId = props.postId;

  useEffect(() => {
    const variable = {
      postId: postId,
    };
    dispatch(getComment(variable)).then((res) => {
      //console.log("res.payload comment : ", res.payload.comment);
      if (res.payload.success) {
        setComments(res.payload.comment);
      } else if (res.payload.result) {
        setComments([]);
      } else {
        alert("댓글 정보를 가져오지 못했습니다.");
      }
    });
  }, [postId]);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();

    const variable = {
      content: CommentValue,
      postId: postId,
      sigineComment: true,
    };

    dispatch(addComment(variable)).then((res) => {
      //console.log("res.payload comment: ", res.payload.comment);
      if (res.payload.success) {
        setCommentValue("");
        setComments(res.payload.comment);
      } else {
        alert("댓글을 저장하지 못했습니다.");
      }
    });
  };
  return (
    <div className="border-bottom border-dark">
      <br />
      <p
        style={{ paddingLeft: "2%", paddingBottom: "2%" }}
        className="border-bottom border-dark"
      >
        댓 글
      </p>
      {/* Comment Listis */}
      {Comments &&
        Comments.map((comment, index) => (
          <React.Fragment key={index}>
            <SingleComment
              comment={comment}
              postId={postId}
              setComments={setComments}
            />
            <ReplyComment
              Comments={Comments}
              comment={comment}
              postId={postId}
              setComments={setComments}
            />
          </React.Fragment>
        ))}
      {/* Root Comment Form */}
      <form
        className="d-flex w-100"
        style={{
          paddingLeft: "2%",
          paddingTop: "2%",
          paddingBottom: "2%",
        }}
        onSubmit={onSubmitHandle}
      >
        <textarea
          style={{ width: "80%" }}
          onChange={handleChange}
          value={CommentValue}
          placeholder="댓글을 작성해주세요."
        />
        <br />
        <button className="m-auto" style={{ width: "15%" }} type="submit">
          댓글 작성
        </button>
      </form>
    </div>
  );
}

export default withRouter(Comment);
