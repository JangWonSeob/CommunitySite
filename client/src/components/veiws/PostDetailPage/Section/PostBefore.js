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
        <div className="m-1">
          <div className="d-flex">이전글</div>
          <div>
            <a
              style={{ height: "3vh" }}
              className="d-flex w-100 text-decoration-none text-dark"
              href={`/post/${Before.postId}`}
            >
              <span style={{ width: "45%" }}>{Before.title}</span> <br />
              {/* <span className="text-center" style={{ width: "15%" }}>
            {Date[index]}
          </span> */}
              <span style={{ width: "15%" }}>{Before.name}</span> <br /> <br />
              <br /> <br />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
export default withRouter(PostBeforeAndNext);
