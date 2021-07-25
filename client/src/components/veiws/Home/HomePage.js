import axios from "axios";
import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";

import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePage(props) {
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/api/post/posts").then((res) => {
      // console.log("res.data posts : ", res.data);
      if (res.data.postsSuccess) {
        // console.log("res.data.rows : ", res.data.rows);
        setPosts(res.data.rows);
      } else {
        alert("게시물를 불러오지 못했습니다.");
      }
    });
  }, []);
  // console.log("Posts : ", Posts);

  const renderPosts = Posts.map((post, index) => {
    // console.log("post : ", post);
    return (
      <Col key={index}>
        <a href={`/post/${post.postId}`}>
          <span>제목 : {post.title}</span> <br />
          <span>내용 : {post.description}</span> <br />
          <span>글쓴이 : {post.writer}</span> <br /> <br />
        </a>
      </Col>
    );
  });

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
      <Row>{renderPosts}</Row>
    </div>
  );
}

export default withRouter(HomePage);
