import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postBefore } from "../../../../_actions/postAction";

function PostBeforeAndNext({ postId }) {
  const dispatch = useDispatch();
  const [Before, setBefore] = useState([]);

  let variable = {
    postId,
  };
  useEffect(() => {
    dispatch(postBefore(variable)).then((res) => {
      console.log("res.data before : ", res.payload);
      if (res.payload.success) {
        setBefore(res.payload.postBefore[0]);
      } else if (res.payload.result) {
        setBefore("");
      }
    });
  }, [postId]);

  console.log("Before : ", Before);
  return (
    <div>
      {Before.name ? (
        <div className="pt-2 pb-1 ps-3 pe-3">
          <div className="d-flex">이전글</div>
          <div>
            <Link
              style={{ height: "3vh" }}
              className="d-flex text-decoration-none text-dark"
              to={`/post/${Before.postId}`}
            >
              <span style={{ width: "60%" }}>{Before.title}</span>
              <span style={{ width: "20%" }}>{Before.name}</span>
              <span className="text-center" style={{ width: "20%" }}>
                {Before.date.slice(0, 10)}
              </span>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default withRouter(PostBeforeAndNext);
