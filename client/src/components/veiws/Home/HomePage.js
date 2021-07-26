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
        <a href={`/post/${post.postId}`} style={{ display: "flex" }}>
          <span style={{ width: "25%" }}>{post.title}</span> <br />
          <span style={{ width: "55%" }}>{post.description}</span> <br />
          <span style={{ width: "15%" }}>{post.writer}</span> <br /> <br />
          <span style={{ width: "15%" }}>{post.view}</span> <br /> <br />
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
      <Row>
        <div style={{ display: "flex", width: "500px" }}>
          <span style={{ width: "25%" }}>제목 </span> <br />
          <span style={{ width: "55%" }}>내용 </span> <br />
          <span style={{ width: "15%" }}>글쓴이 </span> <br /> <br />
          <span style={{ width: "15%" }}>view(s) </span>
        </div>
        {renderPosts}
      </Row>
    </div>
  );
}

export default withRouter(HomePage);
