import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postBefore } from "../../../../_actions/postAction";

function PostBeforeAndNext(props) {
  const dispatch = useDispatch();
  const [Before, setBefore] = useState([]);

  let variable = {
    postId: props.postId,
  };
  useEffect(() => {
    dispatch(postBefore(variable)).then((res) => {
      console.log("res.data benext : ", res.payload);
      if (res.payload.success) {
        setBefore(res.payload.postBefore[0]);
      }
    });
  }, []);

  console.log("Before : ", Before);
  return (
    <div>
      {Before.name && (
        <div className="p-3">
          <div className="d-flex">이전글</div>
          <div>
            <Link
              style={{ height: "3vh" }}
              className="d-flex w-100 text-decoration-none text-dark"
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
      )}
    </div>
  );
}
export default withRouter(PostBeforeAndNext);
