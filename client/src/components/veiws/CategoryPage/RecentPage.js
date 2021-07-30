import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Row } from "reactstrap";

import SideBar from "../SideBar/SideBar";

function RecentPage(props) {
  //   console.log("props : ", props);
  const [RecentPosts, setRecentPosts] = useState([]);
  useEffect(() => {
    axios.get("/api/post/posts").then((res) => {
      if (res.data.postsSuccess) {
        setRecentPosts(res.data.rows);
      } else {
        alert("게시물를 불러오지 못했습니다.");
      }
    });
  }, []);

  const renderPosts = RecentPosts.map((post, index) => {
    // console.log("post : ", post);
    return (
      <div key={index}>
        <a
          className="d-flex w-100 text-decoration-none text-dark"
          href={`/post/${post.postId}`}
        >
          <span style={{ width: "25%" }}>{post.title}</span> <br />
          <span style={{ width: "45%" }}>{post.description}</span> <br />
          <span style={{ width: "25%" }}>{post.writer}</span> <br /> <br />
          <span style={{ width: "15%" }}>{post.view}</span> <br /> <br />
        </a>
      </div>
    );
  });

  return (
    <div>
      <div className="justify-content-center w-100">
        <div className="text-center">
          <img
            style={{ width: "63%", height: "80%" }}
            // className="w-100 h-50 "
            src="image/image.png"
            alt="error"
          />
        </div>
        <div
          style={{ marginTop: "0.5%" }}
          className="d-flex justify-content-center"
        >
          <SideBar />
          <div
            className="border border-dark"
            style={{ width: "51%", marginLeft: "0.5%" }}
          >
            <Row
              className="d-flex p-2"
              style={{ background: "white", marginRight: 0, marginLeft: 0 }}
            >
              <h3 className="border-bottom border-3 pt-3 pb-3">최신 게시물</h3>
              <div className="d-flex">
                <span style={{ width: "25%" }}>제목 </span> <br />
                <span style={{ width: "45%" }}>내용 </span> <br />
                <span style={{ width: "25%" }}>글쓴이 </span> <br /> <br />
                <span style={{ width: "15%" }}>view(s) </span>
              </div>
              {renderPosts}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(RecentPage);
