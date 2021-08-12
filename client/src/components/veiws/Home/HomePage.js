import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row } from "reactstrap";
import { withRouter } from "react-router-dom";
import MovieCards from "./Section/MovieCards";

function HomePage() {
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    // 게시글 가져오기
    axios.get("/api/post/homePost").then((res) => {
      console.log(res.data);
      if (res.data.postsSuccess) {
        setPosts(res.data.rows);
      } else {
        alert("게시물를 불러오지 못했습니다.");
      }
    });
  }, []);

  const renderPosts = Posts.map((post, index) => {
    return (
      <div key={index}>
        <a
          className="d-flex w-100 text-decoration-none text-dark"
          href={`/post/${post.postId}`}
        >
          <span style={{ width: "30%" }}>{post.category}</span> <br />
          <span style={{ width: "40%" }}>{post.title}</span> <br />
          <span style={{ width: "20%" }}>{post.name}</span> <br /> <br />
          <span style={{ width: "10%" }}>{post.view}</span> <br /> <br />
        </a>
      </div>
    );
  });

  const likePosts = Posts.map((post, index) => {
    const likePost = post.view > 5;
    if (likePost) {
      return (
        <div key={index}>
          <a
            className="d-flex w-100 text-decoration-none text-dark"
            href={`/post/${post.postId}`}
          >
            <span style={{ width: "30%" }}>{post.category}</span> <br />
            <span style={{ width: "40%" }}>{post.title}</span> <br />
            <span style={{ width: "20%" }}>{post.name}</span> <br /> <br />
            <span style={{ width: "10%" }}>{post.view}</span> <br /> <br />
          </a>
        </div>
      );
    }

    console.log("post v1 : ", likePost);
  });

  return (
    <div className="d-flex justify-content-center flex-column bg-dark">
      <img
        style={{ width: "1200px", height: "100%", margin: "auto" }}
        // className="w-100 h-50 "
        src="image/image1.png"
        alt="error"
      />
      <div
        className="d-flex justify-content-between m-auto"
        style={{ width: "1200px" }}
      >
        <MovieCards />
      </div>
      <div className="d-flex justify-content-center">
        <div
          className="border-right border-dark pl-1"
          style={{
            width: "25%",
          }}
        >
          <Row
            className="d-flex p-2"
            style={{ background: "white", marginRight: 0, marginLeft: 0 }}
          >
            <h3 className="border-bottom border-3 pt-3 pb-3">최신 게시물</h3>
            <div className="d-flex text-center">
              <span style={{ width: "30%" }}>카테고리 </span> <br />
              <span style={{ width: "40%" }}>제목 </span> <br />
              <span style={{ width: "20%" }}>글쓴이 </span> <br /> <br />
              <span style={{ width: "10%" }}>view(s) </span>
            </div>
            {renderPosts}
          </Row>
        </div>
        <div
          style={{
            width: "25%",
          }}
        >
          <Row
            className="d-flex  p-2"
            style={{ background: "white", marginRight: 0, marginLeft: 0 }}
          >
            <h3 className="border-bottom border-3 pt-3 pb-3">인기 게시물</h3>
            <div className="d-flex text-decoration-none text-center">
              <span style={{ width: "30%" }}>카테고리 </span> <br />
              <span style={{ width: "40%" }}>제목 </span> <br />
              <span style={{ width: "20%" }}>글쓴이 </span> <br /> <br />
              <span style={{ width: "10%" }}>view(s) </span>
            </div>
            {likePosts}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default withRouter(HomePage);
