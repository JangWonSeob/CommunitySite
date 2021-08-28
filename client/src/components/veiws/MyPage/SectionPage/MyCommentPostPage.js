import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { commentPost } from "../../../../_actions/postAction";
import Page from "../../CategoryPage/Section/Page";
import { like, mainImage, paginate } from "../../utils";
import MyPageSiderBar from "../Section/MyPageSiderBar";

function MyCommentPostPage() {
  const dispatch = useDispatch();
  const [MyCommentPost, setMyCommentPost] = useState([]);
  const [PostsLike, setPostsLike] = useState([]);
  const [Date, setDate] = useState([]);
  const [PostPage, setPostPage] = useState(1);

  useEffect(() => {
    dispatch(commentPost()).then((res) => {
      console.log("client data : ", res.payload);
      if (res.payload.success) {
        console.log(res.payload.posts);
        setMyCommentPost(res.payload.posts);
        setDate(res.payload.postDateData);
        if (res.payload.postsLike) {
          setPostsLike(res.payload.postsLike);
        }
      }
    });
  }, []);

  const pagePost = paginate(MyCommentPost, PostPage, 5);
  const MyCommentPosts = pagePost.map((posts, index) => {
    let likes = like(PostsLike, posts);

    return (
      <React.Fragment key={index}>
        <Link
          className="d-flex w-100 text-decoration-none text-dark"
          to={`/post/${posts.postId}`}
        >
          <span className="text-center ms-1 me-1" style={{ width: "10%" }}>
            {likes}
          </span>
          <span className="ms-1 me-1" style={{ width: "45%" }}>
            {posts.title}
          </span>
          <span className="text-center ms-1 me-1" style={{ width: "15%" }}>
            {posts.name}
          </span>
          <span className="text-center ms-1 me-1" style={{ width: "20%" }}>
            {Date[index]}
          </span>
          <span className="text-center ms-1 me-1" style={{ width: "10%" }}>
            {posts.view}
          </span>
          <br /> <br />
        </Link>
      </React.Fragment>
    );
  });

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
            내가 쓴 댓글 게시물
          </h3>
          <br />
          <form style={{ padding: "0px 60px" }}>
            <div className="row d-flex p-2" style={{ background: "white" }}>
              <div className="row">
                <div className="d-flex border-bottom border-3 mb-4 pb-3">
                  <span
                    className="text-center ms-1 me-1"
                    style={{ width: "10%" }}
                  >
                    좋아요
                  </span>
                  <span
                    className="text-center ms-1 me-1"
                    style={{ width: "45%" }}
                  >
                    제목
                  </span>
                  <span
                    className="text-center ms-1 me-1"
                    style={{ width: "15%" }}
                  >
                    글쓴이
                  </span>
                  <span
                    className="text-center ms-1 me-1"
                    style={{ width: "20%" }}
                  >
                    등록일
                  </span>
                  <span
                    className="text-center ms-1 me-1"
                    style={{ width: "10%" }}
                  >
                    view(s)
                  </span>
                </div>
                {MyCommentPosts}
              </div>
              <Page
                postLength={MyCommentPost.length}
                postPageCount={setPostPage}
                postCount={5}
              />
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default MyCommentPostPage;
