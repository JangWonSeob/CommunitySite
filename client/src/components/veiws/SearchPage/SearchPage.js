import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import SearchBar from "../CategoryPage/Section/SearchBar";
import Page from "../CategoryPage/Section/Page";
import { Row } from "reactstrap";

function SearchPage(props) {
  const [ResultPost, setResultPost] = useState([]);
  const [Date, setDate] = useState([]);
  const [PostPage, setPostPage] = useState(1);
  const [Message, setMessage] = useState("");

  let Category = props.match.params.category;
  let Search = props.match.params.search;
  let variable = {
    Category,
    Search,
  };

  useEffect(() => {
    console.log("variable : ", variable);
    axios.post("/api/post/search", variable).then((res) => {
      if (res.data.search) {
        setResultPost(res.data.result);
        setDate(res.data.postDateData);
      } else {
        setMessage(res.data.message);
      }
      console.log("search data : ", res.data);
    });
  }, []);

  const renderPosts = ResultPost.map((post, index) => {
    console.log("post : ", post);
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
  console.log("Message : ", Message);
  console.log("ResultPost : ", ResultPost);
  return (
    <div>
      <div className="justify-content-center w-100">
        <div className="text-center">
          <img
            style={{ width: "63%", height: "80%" }}
            // className="w-100 h-50 "
            src="/image/image.png"
            alt="image"
          />
        </div>
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
            <Row
              className="d-flex p-2"
              style={{ background: "white", marginRight: 0, marginLeft: 0 }}
            >
              <h3 className="border-bottom border-3 pt-3 pb-3">최신 게시물</h3>
              <div className="d-flex">
                <span style={{ width: "25%" }}>카테고리</span>
                <br />
                <span className="text-center" style={{ width: "45%" }}>
                  제목
                </span>
                <br />
                <span className="text-center" style={{ width: "15%" }}>
                  등록일
                </span>
                <span style={{ width: "15%" }}>글쓴이 </span> <br /> <br />
                <span className="text-center" style={{ width: "10%" }}>
                  view(s)
                </span>
              </div>
              {Message ? (
                <h4 className="text-center">{Message}</h4>
              ) : (
                renderPosts
              )}
            </Row>
            <Page postLength={ResultPost.length} postPageCount={setPostPage} />
            <div className="text-center">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SearchPage);
