import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { categoryPost } from "../../../_actions/postAction";

import { paginate, mainImage } from "../utils";

import Page from "./Section/Page";
import SideBar from "../SideBar/SideBar";
import SearchBar from "./Section/SearchBar";

function CategoryPage(props) {
  const dispatch = useDispatch();
  const [CategoryPosts, setCategoryPosts] = useState([]);
  const [Date, setDate] = useState([]);
  const [PostPage, setPostPage] = useState(1);
  const [Message, setMessage] = useState("");
  const category = props.match.params.category;
  console.log("category 11 : ", category);

  //params를 통해서 url 변경 시 데이터를 받아온다.
  useEffect(() => {
    dispatch(categoryPost(category)).then((res) => {
      console.log("res.payload : ", res.payload);
      if (res.payload.success) {
        setCategoryPosts(res.payload.categoryPost);
        setDate(res.payload.postDateData);
        setMessage("");
      } else if (res.payload.message) {
        setMessage(res.payload.message);
        setCategoryPosts([]);
      } else {
        alert("게시물를 불러오지 못했습니다.");
      }
    });
  }, [category]);

  const pagePost = paginate(CategoryPosts, PostPage, 20);
  //   console.log("pagePost : ", pagePost);

  //   console.log("PostPage : ", PostPage);

  const renderPosts = pagePost.map((post, index) => {
    // console.log("post : ", post.date);
    return (
      <div key={index}>
        <a
          className="d-flex w-100 text-decoration-none text-dark"
          href={`/post/${post.postId}`}
        >
          <span style={{ width: "25%" }}>{post.categoryName}</span> <br />
          <span style={{ width: "45%" }}>{post.title}</span> <br />
          <span className="text-center" style={{ width: "15%" }}>
            {Date[index]}
          </span>
          <span style={{ width: "15%" }}>{post.name}</span> <br /> <br />
          <span className="text-center" style={{ width: "10%" }}>
            {post.view}
          </span>
          <br /> <br />
        </a>
      </div>
    );
  });
  return (
    <div>
      <div className="justify-content-center w-100">
        <div className="text-center">{mainImage}</div>
        <div
          style={{ marginTop: "0.5%" }}
          className="d-flex justify-content-center"
        >
          <div style={{ height: "100%", width: "11.5%" }}>
            <SideBar />
          </div>
          <div
            className="border border-dark"
            style={{ width: "51.2%", marginLeft: "0.5%" }}
          >
            <div
              className="row d-flex p-2"
              style={{ background: "white", marginRight: 0, marginLeft: 0 }}
            >
              <h3 className="border-bottom border-3 pt-3 pb-3">{category}</h3>
              <div className="d-flex">
                <span style={{ width: "25%" }}>카테고리</span>
                <span className="text-center" style={{ width: "45%" }}>
                  제목
                </span>
                <span className="text-center" style={{ width: "15%" }}>
                  등록일
                </span>
                <span style={{ width: "15%" }}>글쓴이 </span>
                <span className="text-center" style={{ width: "10%" }}>
                  view(s)
                </span>
              </div>
              <br /> <br />
              {CategoryPosts.length ? (
                renderPosts
              ) : (
                <div className="text-center h4 p-4">{Message}</div>
              )}
            </div>
            <Page
              postLength={CategoryPosts.length}
              postPageCount={setPostPage}
              postCount={20}
            />
            <div className="text-center">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CategoryPage);
