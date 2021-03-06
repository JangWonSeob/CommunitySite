import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import MovieCards from "./Section/MovieCards";

function HomePage() {
  const [Posts, setPosts] = useState([]);
  const [PopularPost, setPopularPost] = useState([]);

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
    axios.get("/api/post/popularPost").then((res) => {
      console.log(res.data);
      if (res.data.postsSuccess) {
        setPopularPost(res.data.rows);
      } else {
        alert("인기 게시물를 불러오지 못했습니다.");
      }
    });
  }, []);

  const renderPosts = Posts.map((post, index) => {
    return (
      <div key={index}>
        <Link
          className="d-flex w-100 text-decoration-none text-dark"
          to={`/post/${post.postId}`}
        >
          <span style={{ width: "30%" }}>{post.categoryName}</span>
          <span style={{ width: "40%" }}>{post.title}</span>
          <span style={{ width: "20%" }}>{post.name}</span>
          <span style={{ width: "10%" }}>{post.view}</span>
        </Link>
        <br />
      </div>
    );
  });

  const likePosts = PopularPost.map((post, index) => {
    return (
      <div key={index}>
        <Link
          className="d-flex w-100 text-decoration-none text-dark"
          to={`/post/${post.postId}`}
        >
          <span style={{ width: "30%" }}>{post.categoryName}</span>
          <span style={{ width: "40%" }}>{post.title}</span>
          <span style={{ width: "20%" }}>{post.name}</span>
          <span style={{ width: "10%" }}>{post.view}</span>
        </Link>
        <br />
      </div>
    );
  });
  return (
    <div className="d-flex justify-content-center flex-column bg-dark">
      <img
        style={{
          width: "1200px",
          height: "100%",
          margin: "auto",
          paddingTop: "20px",
        }}
        src="/image/image.png"
        alt="error"
      />
      <div
        className="d-flex justify-content-between m-auto"
        style={{ width: "1200px" }}
      >
        <MovieCards />
      </div>
      <br />
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
              <span style={{ width: "30%" }}>카테고리 </span>
              <span style={{ width: "40%" }}>제목 </span>
              <span style={{ width: "20%" }}>글쓴이 </span>
              <span style={{ width: "10%" }}>view(s) </span>
            </div>
            <br /> <br />
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
              <span style={{ width: "30%" }}>카테고리 </span>
              <span style={{ width: "40%" }}>제목 </span>
              <span style={{ width: "20%" }}>글쓴이 </span>
              <span style={{ width: "10%" }}>view(s) </span>
            </div>
            <br /> <br />
            {likePosts}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default withRouter(HomePage);
