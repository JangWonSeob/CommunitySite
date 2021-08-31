import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { addComment } from "../../../../_actions/commentAction";
import LikeDislike from "./LikeDislike";

function ReplyComment(props) {
  const dispatch = useDispatch();
  const [CommentValue, setCommentValue] = useState("");
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenCommentLikst, setOpenCommentLikst] = useState(false);
  const [OpenReply, setOpenReply] = useState(false);
  const postId = props.postId;

  //console.log("reply : ", props.comment);
  useEffect(() => {
    let commentNumber = 0;
    props.Comments.map((commentlist) => {
      if (props.comment.commentId === Number(commentlist.responseToCommentId)) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [props.Comments]);
  //console.log("ChildCommentNumber : ", ChildCommentNumber);

  const onClickCommentList = () => {
    setOpenCommentLikst(!OpenCommentLikst);
  };

  const onClickReply = () => {
    setOpenReply(!OpenReply);
  };
  //console.log("OpenCommentLikst: ", OpenCommentLikst);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();

    //console.log("props.comment.commentId : ", props.comment.commentId);
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

  const OpenComment = () => {
    if (ChildCommentNumber !== 0) {
      if (!OpenCommentLikst) {
        return (
          <div
            style={{ margin: "0.5% 0 0.5% 2%", cursor: "pointer" }}
            onClick={onClickCommentList}
          >
            {ChildCommentNumber}개의 댓글이 있습니다.
          </div>
        );
      } else {
        return (
          <div
            style={{ margin: "0.5% 0 0.5% 2%", cursor: "pointer" }}
            onClick={onClickCommentList}
          >
            {ChildCommentNumber}개의 댓글 숨기기
          </div>
        );
      }
    }
  };

  return (
    <div>
      {OpenComment()}

      {OpenCommentLikst &&
        props.Comments.map((commentlist, index) => (
          <React.Fragment key={index}>
            {props.comment.commentId ===
              Number(commentlist.responseToCommentId) && (
              <div style={{ margin: "0 0 0.5% 4%" }}>
                <span>{commentlist.name}</span>
                <span> : {commentlist.content}</span>
                <br />
                <div className="d-flex">
                  <span style={{ cursor: "pointer" }} onClick={onClickReply}>
                    Reply
                  </span>
                  <LikeDislike commentId={commentlist.commentId} />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
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

export default withRouter(ReplyComment);
