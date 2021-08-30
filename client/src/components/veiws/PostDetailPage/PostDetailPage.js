import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { detailPage, deletePost } from "../../../_actions/postAction";
import { withRouter } from "react-router-dom";
import Comment from "./Section/Comment";
import SideBar from "../SideBar/SideBar";
import Favorites from "./Section/Favorites";
import Like from "./Section/LikeDislike";
import PostBefore from "./Section/PostBefore";
import PostNext from "./Section/PostNext";

function PostDetailPage(props) {
  const dispatch = useDispatch();
  const postId = props.match.params.postId;

  const variable = {
    postId: postId,
  };

  const [PostDetail, setPostDetail] = useState([]);
  const [Delete, setDelete] = useState(false);
  const [MyPost, setMyPost] = useState(false);

  useEffect(() => {
    dispatch(detailPage(variable)).then((res) => {
      //console.log("res.payload.rows[0] : ", res.payload);
      if (res.payload.PostDetail) {
        setPostDetail(res.payload.PostDetail);
        if (res.payload.MyPost) {
          setMyPost(res.payload.MyPost);
        }
      } else {
        alert("게시판 정보를 가져오지 못했습니다.");
      }
    });
  }, [postId]);
  //console.log("MyPost : ", MyPost);

  const onClickModify = (e) => {
    e.preventDefault();
    props.history.push(`/modifyPost/${postId}`);
  };
  const onClickDelete = (e) => {
    e.preventDefault();
    dispatch(deletePost(variable)).then((res) => {
      console.log("res.payload.rows[0] : ", res.payload);
      if (res.payload.delete) {
        console.log("delete post success");
        setDelete(true);
        alert("성공적으로 삭제하였습니다.");
        props.history.push("/");
      } else {
        alert("게시판 정보를 삭제하지 못했습니다.");
      }
    });
  };

  const markup = () => {
    return { __html: `${PostDetail.description}` };
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center w-100"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div className="text-center">
        <img
          style={{ width: "63.5%", height: "80%" }}
          // className="w-100 h-50 "
          src="/image/image.png"
          alt="error"
        />
      </div>

      <div
        style={{ marginTop: "0.5%" }}
        className="d-flex justify-content-center w-100"
      >
        <div style={{ height: "100%", width: "11.5%" }}>
          <SideBar />
        </div>
        <div
          className="border border-dark"
          style={{ width: "51.2%", marginLeft: "0.5%", height: "100%" }}
        >
          <div className="d-flex w-100 p-3 justify-content-between">
            <div className="d-flex">
              <h2 className="">{PostDetail.title}</h2>
            </div>

            <div style={{ marginRight: "1%" }} className="d-flex flex-column">
              <div>
                <Favorites MyPost={MyPost} postId={postId} />
              </div>
              <span>{PostDetail.date}</span>
            </div>
          </div>
          <div className="d-flex justify-content-between p-3 border-bottom border-dark">
            <div className="d-flex">
              <span className="d-flex">
                Category : {PostDetail.categoryName}
              </span>
              <br />
              <span className="d-flex" style={{ marginLeft: "50px" }}>
                User name : {PostDetail.name}
              </span>
              <br />
            </div>
            <div>
              <span className="p-2 ">{PostDetail.view} views</span>
              <br />
            </div>
          </div>
          <br />
          <div
            style={{ minHeight: "50%" }}
            className=" d-flex justify-content-between"
          >
            <div className="m-3">
              <div dangerouslySetInnerHTML={markup()}></div>
            </div>
            <div className="m-3">
              {MyPost && (
                <div>
                  <button onClick={onClickModify}>수정</button>
                  <button onClick={onClickDelete}>삭제</button>
                </div>
              )}
            </div>
          </div>
          <div className="border-bottom border-dark">
            <Like post postId={postId} />
          </div>

          <div>
            <Comment postId={postId} />
          </div>
          <div>
            <PostBefore postId={postId} />
          </div>
          <div>
            <PostNext postId={postId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(PostDetailPage);
