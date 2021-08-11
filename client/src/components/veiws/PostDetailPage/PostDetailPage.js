import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { detailPage, deletePost } from "../../../_actions/postAction";
import { getComment } from "../../../_actions/commentAction";
import { withRouter } from "react-router-dom";
import Comment from "./Section/Comment";
import SideBar from "../SideBar/SideBar";

function PostDetailPage(props) {
  console.log("props : ", props.match);
  const dispatch = useDispatch();
  const postId = props.match.params.postId;
  const localStorageUserId = window.localStorage.getItem("userId");

  const variable = {
    postId: postId,
  };
  const [Comments, setComments] = useState([]);
  const [PostDetail, setPostDetail] = useState([]);
  const [User, setUser] = useState([]);
  const [Delete, setDelete] = useState(false);

  console.log("comments : ", Comments.length);

  useEffect(() => {
    dispatch(detailPage(variable)).then((res) => {
      console.log("res.payload.rows[0] : ", res.payload);
      if (res.payload.viewUpdateSuccess) {
        // setPostDetail(res.payload.Detail);
        // setUser(res.payload.User);
        // console.log(" user Id : ", res.payload.User.id);
      } else {
        alert("게시판 정보를 가져오지 못했습니다.");
      }
      dispatch(getComment(variable)).then((res) => {
        console.log("res.payload comment : ", res.payload.comment);
        if (res.payload.success) {
          setComments(res.payload.comment);
        } else {
          alert("댓글 정보를 가져오지 못했습니다.");
        }
      });
    });
  }, []);

  const onClick = () => {
    dispatch(deletePost(variable)).then((res) => {
      console.log("res.payload.rows[0] : ", res.payload);
      if (res.payload.delete) {
        props.history.push("/");
        console.log("delete post success");
        setDelete(true);
        alert("성공적으로 삭제하였습니다.");
      } else {
        alert("게시판 정보를 삭제하지 못했습니다.");
      }
    });
  };

  const refreshFunction = (newComment) => {
    setComments(Comments.concat(newComment)); // concat : Comments와 newComment를 합친 값을 setComments 넣는다.
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
        <SideBar />
        <div
          className="border border-dark"
          style={{ width: "51%", marginLeft: "0.5%" }}
        >
          <div className="d-flex w-100 p-3 justify-content-between">
            <div className="d-flex">
              <h2 className="">{PostDetail.title}</h2>
              <span className="p-2">[{Comments.length}]</span>
            </div>
            <div className="p-2">
              <span>{PostDetail.date}</span>
            </div>
          </div>
          <div className="d-flex justify-content-between p-3 border-bottom border-dark">
            <div className="d-flex">
              <span className="d-flex">Category : {PostDetail.category}</span>
              <br />
              <span className="d-flex" style={{ marginLeft: "50px" }}>
                User : {User.name}
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
            style={{ minHeight: "30%" }}
            className="d-flex border-bottom border-dark justify-content-between"
          >
            <div className="m-3">
              <div dangerouslySetInnerHTML={markup()}></div>
              {/* <CKEditor editor={BallonEditor} data={PostDetail.description} /> */}
              {/* <span>{PostDetail.description}</span> */}
              <br /> <br />
              <br /> <br />
            </div>
            <div className="m-3">
              {localStorageUserId === User.id && (
                <button onClick={onClick}>삭제</button>
              )}
            </div>
          </div>

          <Comment
            postId={postId}
            commentList={Comments}
            refreshFunction={refreshFunction}
          />
        </div>
      </div>
    </div>
  );
}

export default withRouter(PostDetailPage);
