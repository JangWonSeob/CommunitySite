import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

function Like({ MyPost, postId }) {
  const [Likes, setLikes] = useState(false);
  const [Login, setLogin] = useState(false);
  console.log("post : ", postId);

  useEffect(() => {
    let variable = {
      postNumber: postId,
    };
    axios.post("/api/like/liked", variable).then((res) => {
      if (res.data.logining) {
        setLogin(res.data.logining);
        setLikes(res.data.liked);
      }
      console.log("Like data", res.data);
    });
  }, []);

  const LikeIcons = () => {
    if (Login) {
      if (Likes) {
        return (
          <FontAwesomeIcon
            className="border border-dark rounded fa-lg float-end"
            style={{ background: "yellow" }}
            icon={faStar}
          />
        );
      } else {
        return (
          <FontAwesomeIcon
            className="border border-dark rounded fa-lg float-end"
            icon={faStar}
          />
        );
      }
    }
  };
  const onLike = () => {
    let variable = {
      postNumber: postId,
    };
    if (!Likes) {
      axios.post("/api/like/like", variable).then((res) => {
        console.log("Like data11111", res.data);
        if (res.data.success) {
          setLikes(!Likes);
        }
      });
    } else {
      axios.post("/api/like/unLiked", variable).then((res) => {
        console.log("Like data2222", res.data);
        if (res.data.success) {
          setLikes(!Likes);
        }
      });
    }
  };

  return <div onClick={onLike}>{LikeIcons()}</div>;
}

export default Like;
