import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { detailPage } from "../../../_actions/postAction";
import { withRouter } from "react-router-dom";
import Comment from "./Section/Comment";

function PostDetailPage(props) {
  const dispatch = useDispatch();
  const postId = props.match.params.postId;

  const variable = {
    postId: postId,
  };
  const [Comments, setComments] = useState([]);
  const [PostDetail, setPostDetail] = useState([]);

  useEffect(() => {
    dispatch(detailPage(variable)).then((res) => {
      console.log("res.payload.rows[0] : ", res.payload.Detail);
      if (res.payload.viewUpdateSuccess) {
        setPostDetail(res.payload.Detail);
      } else {
        alert("게시물 정보를 가져오지 못했습니다.");
      }
    });
  }, []);

  const refreshFunction = (newComment) => {
    setComments(Comments.concat(newComment)); // concat : Comments와 newComment를 합친 값을 setComments 넣는다.
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <span>
        <h2>{PostDetail.title}</h2>
        <span>Category : {PostDetail.category}</span> <br />
        <span>Day :{PostDetail.date}</span> <br />
        <span>{PostDetail.view} views</span> <br />
        <span>writer : {PostDetail.writer}</span> <br />
        <span>{PostDetail.description}</span> <br />
        <Comment
          postId={postId}
          commentList={Comments}
          refreshFunction={refreshFunction}
        />
      </span>
    </div>
  );
}

export default withRouter(PostDetailPage);
