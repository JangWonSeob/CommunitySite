import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Page from "../../CategoryPage/Section/Page";
import { like, mainImage, paginate } from "../../utils";
import { favoritesPost } from "../../../../_actions/postAction";
import MyPageSiderBar from "../Section/MyPageSiderBar";
import { Link } from "react-router-dom";

function FavoritesPostPage() {
  const dispatch = useDispatch();
  const [MyFavoritesPosts, setMyFavoritesPosts] = useState([]);
  const [PostsLike, setPostsLike] = useState([]);
  const [Date, setDate] = useState([]);
  const [PostPage, setPostPage] = useState(1);

  useEffect(() => {
    dispatch(favoritesPost()).then((res) => {
      console.log(res.payload);
      if (res.payload.success) {
        setMyFavoritesPosts(res.payload.favoritesPost);
        setDate(res.payload.postDateData);
        if (res.payload.postsLike) {
          setPostsLike(res.payload.postsLike);
        }
      }
    });
  }, []);

  const pagePost = paginate(MyFavoritesPosts, PostPage, 5);

  const FavoritesPosts = pagePost.map((posts, index) => {
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
            즐겨 찾기
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
                {FavoritesPosts}
              </div>
              <Page
                postLength={MyFavoritesPosts.length}
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

export default FavoritesPostPage;
