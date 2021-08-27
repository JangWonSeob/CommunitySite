import axios from "axios";
import React, { useState, useEffect } from "react";
import { mainImage } from "../../utils";
import MyPageSiderBar from "../Section/MyPageSiderBar";

function GradePage() {
  const [MyPostLength, setMyPostLength] = useState("");
  const [MyCommentLength, setMyCommentLength] = useState("");
  const [MyFavoritesLength, setMyFavoritesLength] = useState("");

  useEffect(() => {
    axios.get("/api/myPage/grade/postLength").then((res) => {
      console.log(res.data);
      if (res.data.success) {
        setMyPostLength(res.data.postLength.postLength);
      }
    });
    axios.get("/api/myPage/grade/commentLength").then((res) => {
      console.log(res.data);
      if (res.data.success) {
        setMyCommentLength(res.data.commentLength.commentLength);
      }
    });
    axios.get("/api/myPage/grade/likeLength").then((res) => {
      console.log(res.data);
      if (res.data.success) {
        setMyFavoritesLength(res.data.likeLength.likeLength);
      }
    });
  }, []);

  console.log(MyPostLength, MyCommentLength, MyFavoritesLength);
  return (
    <div>
      <div className="text-center">{mainImage}</div>
      <div className="d-flex justify-content-center">
        <div style={{ width: "175px", marginTop: "10px" }}>
          <MyPageSiderBar />
        </div>
        <main
          style={{ width: "52.5%", margin: "10px 0px 0px 25px" }}
          className="border border-2 justify-content-center"
        >
          <br />
          <h3 className="text-center" style={{ fontWeight: "bold" }}>
            등급업 시스템
          </h3>
          <br />
          <form>
            <div
              className="border border-dark border-1 p-4 m-auto"
              style={{ width: "85%" }}
            >
              <label style={{ fontWeight: "bold", margin: "0 20px 0 50px" }}>
                내가 쓴 게시물 갯수
              </label>
              <span>{MyPostLength ? MyPostLength : 0}</span>
              <label style={{ fontWeight: "bold", margin: "0 20px 0 65px" }}>
                내가 쓴 댓글 갯수
              </label>
              <span>{MyCommentLength ? MyCommentLength : 0}</span>
              <label style={{ fontWeight: "bold", margin: "0 20px 0 65px" }}>
                내가 좋아요 한 갯수
              </label>
              <span>{MyFavoritesLength ? MyFavoritesLength : 0}</span>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default GradePage;
