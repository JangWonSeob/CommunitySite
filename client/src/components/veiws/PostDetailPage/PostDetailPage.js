import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailPage } from "../../../actions/postAction";
import { withRouter } from "react-router-dom";

function PostDetailPage(props) {
  const dispatch = useDispatch();
  const postId = props.match.params.postId;

  const variable = {
    postId: postId,
  };
  const [PostDetail, setPostDetail] = useState([]);

  useEffect(() => {
    dispatch(detailPage(variable)).then((res) => {
      console.log("res.payload.rows[0] : ", res);
      if (res.payload.viewUpdateSuccess) {
        setPostDetail(res.payload.rows[0]);
      } else {
        alert("게시물 정보를 가져오지 못했습니다.");
      }
    });
  }, []);

  console.log("PostDetail : ", PostDetail);
  console.log("PostDetail title : ", PostDetail.title);

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
        <span>Day : {PostDetail.date}</span> <br />
        <span>{PostDetail.view} views</span> <br />
        <span>writer : {PostDetail.writer}</span> <br />
        <span>{PostDetail.description}</span> <br />
      </span>
    </div>
  );
}

export default withRouter(PostDetailPage);
