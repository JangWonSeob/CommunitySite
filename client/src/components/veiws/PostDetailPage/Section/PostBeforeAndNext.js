import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postBeforeNext } from "../../../../_actions/postAction";

function PostBeforeAndNext(props) {
  const dispatch = useDispatch();
  const [BeforeNext, setBeforeNext] = useState([]);
  console.log("BeforeNext : ", BeforeNext);
  let variable = {
    postId: props.postId,
  };
  useEffect(() => {
    dispatch(postBeforeNext(variable)).then((res) => {
      console.log("res.data benext : ", res.payload);
      if (res.payload.success) {
        setBeforeNext(res.payload.postBeforeNext);
      }
    });
  }, []);

  const postList = () => {};
  return (
    <div>
      <div className="d-flex">
        <span style={{ width: "25%" }}>카테고리</span>
        <br />
        <span className="text-center" style={{ width: "45%" }}>
          제목
        </span>
        <br />
        {/*<span className="text-center" style={{ width: "15%" }}>
          등록일
        </span>*/}
        <span style={{ width: "15%" }}>글쓴이 </span> <br /> <br />
        <span className="text-center" style={{ width: "10%" }}>
          view(s)
        </span>
      </div>
      {BeforeNext &&
        BeforeNext.map((posts, index) => {
          console.log("posts.postId :", posts.postId);
          return (
            <div key={index}>
              <a
                className="d-flex w-100 text-decoration-none text-dark"
                href={`/post/${posts.postId}`}
              >
                <span style={{ width: "25%" }}>{posts.category}</span> <br />
                <span style={{ width: "45%" }}>{posts.title}</span> <br />
                {/* <span className="text-center" style={{ width: "15%" }}>
            {Date[index]}
          </span> */}
                <span style={{ width: "15%" }}>{posts.name}</span> <br /> <br />
                <span className="text-center" style={{ width: "10%" }}>
                  {posts.view}
                </span>
                <br /> <br />
              </a>
            </div>
          );
        })}
    </div>
  );
}
export default withRouter(PostBeforeAndNext);
