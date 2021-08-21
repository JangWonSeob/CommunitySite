import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postNext } from "../../../../_actions/postAction";

function PostBeforeAndNext(props) {
  const dispatch = useDispatch();
  const [Next, setNext] = useState([]);

  let variable = {
    postId: props.postId,
  };
  useEffect(() => {
    dispatch(postNext(variable)).then((res) => {
      console.log("res.data benext : ", res.payload);
      if (res.payload.success) {
        setNext(res.payload.postNext[0]);
      }
    });
  }, []);

  console.log("Next : ", Next);
  return (
    <div>
      {Next.name && (
        <div className="m-1">
          <div className="d-flex">다음글</div>
          <div>
            <a
              style={{ height: "3vh" }}
              className="d-flex w-100 text-decoration-none text-dark"
              href={`/post/${Next.postId}`}
            >
              <span style={{ width: "45%" }}>{Next.title}</span> <br />
              {/* <span className="text-center" style={{ width: "15%" }}>
            {Date[index]}
          </span> */}
              <span style={{ width: "15%" }}>{Next.name}</span> <br /> <br />
              <br /> <br />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
export default withRouter(PostBeforeAndNext);
