import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postNext } from "../../../../_actions/postAction";

function PostBeforeAndNext({ postId }) {
  const dispatch = useDispatch();
  const [Next, setNext] = useState([]);

  let variable = {
    postId,
  };
  useEffect(() => {
    dispatch(postNext(variable)).then((res) => {
      console.log("res.data benext : ", res.payload);
      if (res.payload.success) {
        setNext(res.payload.postNext[0]);
      } else if (res.payload.result) {
        setNext("");
      }
    });
  }, [postId]);

  console.log("Next : ", Next);
  return (
    <div>
      {Next.name && (
        <div className="pt-2 pb-2 ps-3 pe-3">
          <div className="d-flex">다음글</div>
          <div>
            <Link
              style={{ height: "3vh" }}
              className="d-flex text-decoration-none text-dark"
              to={`/post/${Next.postId}`}
            >
              <span style={{ width: "60%" }}>{Next.title}</span>
              <span style={{ width: "20%" }}>{Next.name}</span>
              <span className="text-center" style={{ width: "20%" }}>
                {Next.date.slice(0, 10)}
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
export default withRouter(PostBeforeAndNext);
