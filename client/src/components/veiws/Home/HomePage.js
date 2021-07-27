import axios from "axios";
import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";

import { withRouter } from "react-router-dom";

function HomePage() {
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/api/post/posts").then((res) => {
      if (res.data.postsSuccess) {
        setPosts(res.data.rows);
      } else {
        alert("게시물를 불러오지 못했습니다.");
      }
    });
  }, []);

  const renderPosts = Posts.map((post, index) => {
    // console.log("post : ", post);
    return (
      <div key={index}>
        <a
          href={`/post/${post.postId}`}
          style={{ display: "flex", width: "100%" }}
        >
          <span style={{ width: "25%" }}>{post.title}</span> <br />
          <span style={{ width: "45%" }}>{post.description}</span> <br />
          <span style={{ width: "25%" }}>{post.writer}</span> <br /> <br />
          <span style={{ width: "15%" }}>{post.view}</span> <br /> <br />
        </a>
      </div>
    );
  });

  const likePosts = Posts.map((post, index) => {
    // console.log("post v : ", post);
    const likePost = post.view > 5;
    if (likePost) {
      return (
        <div key={index}>
          <a
            href={`/post/${post.postId}`}
            style={{ display: "flex", width: "100%" }}
          >
            <span style={{ width: "25%" }}>{post.title}</span> <br />
            <span style={{ width: "45%" }}>{post.description}</span> <br />
            <span style={{ width: "25%" }}>{post.writer}</span> <br /> <br />
            <span style={{ width: "15%" }}>{post.view}</span> <br /> <br />
          </a>
        </div>
      );
    }

    console.log("post v1 : ", likePost);
  });

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "45%",
        }}
      >
        <Row
          className="ml-50"
          style={{
            display: "flex",
            marginLeft: "10%",
            border: "3px solid gray",
            borderRadius: "10px",
            padding: "3% 3% 3% 3%",
          }}
        >
          <h3 className="mb-5" style={{ borderBottom: "3px solid gray" }}>
            최신 게시물
          </h3>
          <div style={{ display: "flex" }}>
            <span style={{ width: "25%" }}>제목 </span> <br />
            <span style={{ width: "45%" }}>내용 </span> <br />
            <span style={{ width: "25%" }}>글쓴이 </span> <br /> <br />
            <span style={{ width: "15%" }}>view(s) </span>
          </div>
          {renderPosts}
        </Row>
      </div>
      <div
        style={{
          width: "45%",
        }}
      >
        <Row
          className="ml-50"
          style={{
            display: "flex",
            marginLeft: "10%",
            border: "3px solid gray",
            borderRadius: "10px",
            padding: "3% 3% 3% 3%",
          }}
        >
          <h3 className="mb-5" style={{ borderBottom: "3px solid gray" }}>
            인기 게시물
          </h3>
          <div style={{ display: "flex" }}>
            <span style={{ width: "25%" }}>제목 </span> <br />
            <span style={{ width: "45%" }}>내용 </span> <br />
            <span style={{ width: "25%" }}>글쓴이 </span> <br /> <br />
            <span style={{ width: "15%" }}>view(s) </span>
          </div>
          {likePosts}
        </Row>
      </div>
    </div>
  );
}

export default withRouter(HomePage);
