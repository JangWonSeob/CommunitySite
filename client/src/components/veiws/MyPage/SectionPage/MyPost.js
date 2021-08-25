import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { like, mainImage, paginate } from "../../utils";
import { myPost } from "../../../../_actions/postAction";
import MyPageSiderBar from "../Section/MyPageSiderBar";
import { Link } from "react-router-dom";
import Page from "../../CategoryPage/Section/Page";

function MyPost() {
  const dispatch = useDispatch();
  const [MyPostsData, setMyPostsData] = useState([]);
  const [PostsLike, setPostsLike] = useState([]);
  const [Date, setDate] = useState([]);
  const [PostPage, setPostPage] = useState(1);

  useEffect(async () => {
    await dispatch(myPost()).then((res) => {
      console.log(res);
      if (res.payload.success) {
        console.log(res.payload.posts);
        setMyPostsData(res.payload.posts);
        setDate(res.payload.postDateData);
        if (res.payload.postsLike) {
          setPostsLike(res.payload.postsLike);
        }
      }
    });
  }, []);

  const pagePost = paginate(MyPostsData, PostPage, 5);
  const Myposts = pagePost.map((posts, index) => {
    let likes = like(PostsLike, posts);

    return (
      <React.Fragment key={index}>
        <Link
          className="d-flex w-100 text-decoration-none text-dark"
          to={`/post/${posts.postId}`}
        >
          <span className="text-center" style={{ width: "10%" }}>
            {likes}
          </span>
          <span style={{ width: "45%" }}>{posts.title}</span>
          <span className="text-center" style={{ width: "15%" }}>
            {posts.name}
          </span>
          <span className="text-center" style={{ width: "20%" }}>
            {Date[index]}
          </span>
          <span className="text-center" style={{ width: "10%" }}>
            {posts.view}
          </span>
          <br /> <br />
        </Link>
      </React.Fragment>
    );
  });

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="text-center">{mainImage()}</div>
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
            내가 쓴 게시물
          </h3>
          <br />
          <form style={{ padding: "0px 60px" }} onSubmit={onSubmit}>
            <div
              className="row d-flex p-2"
              style={{ background: "white", marginRight: 0, marginLeft: 0 }}
            >
              <div className="row">
                <div className="d-flex border-bottom border-3 mb-4 pb-3">
                  <span className="text-center" style={{ width: "10%" }}>
                    좋아요
                  </span>
                  <span className="text-center" style={{ width: "45%" }}>
                    제목
                  </span>
                  <span className="text-center" style={{ width: "15%" }}>
                    글쓴이
                  </span>
                  <span className="text-center" style={{ width: "20%" }}>
                    등록일
                  </span>
                  <span className="text-center" style={{ width: "10%" }}>
                    view(s)
                  </span>
                </div>
                {Myposts}
              </div>
              <Page
                postLength={MyPostsData.length}
                postPageCount={setPostPage}
                postCount={5}
              />
            </div>
            <div className="row"></div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default MyPost;
