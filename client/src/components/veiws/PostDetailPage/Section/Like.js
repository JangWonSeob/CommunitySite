import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

function Like({ postId }) {
  const [Likes, setLikes] = useState(false);
  const [Login, setLogin] = useState(false);

  useEffect(() => {
    let variable = {
      postNumber: postId,
    };
    // 로그인 여부 확인, 즐겨찾기 여부 확인
    axios.post("/api/like/liked", variable).then((res) => {
      if (res.data.logining) {
        setLogin(res.data.logining);
        setLikes(res.data.liked);
      }
    });
  }, []);

  const LikeIcons = () => {
    if (Login) {
      // 로그인 상태에서만 즐겨찾기 버튼이 보인다.
      if (Likes) {
        // 즐겨찾기가 되어 있다면 노란색 배경
        return (
          <FontAwesomeIcon
            className="border border-dark rounded fa-lg float-end"
            style={{ background: "yellow" }}
            icon={faStar}
          />
        );
      } else {
        // 즐겨찾기가 되어 있지 않다면 투명 배경
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
      // 즐가찾기가 되어 있지 않다면 클릭하면 즐겨찾기 추가
      axios.post("/api/like/like", variable).then((res) => {
        if (res.data.success) {
          setLikes(!Likes);
        }
      });
    } else {
      // 즐가찾기가 되어 있다면 클릭하면 즐겨찾기 삭제
      axios.post("/api/like/unLiked", variable).then((res) => {
        if (res.data.success) {
          setLikes(!Likes);
        }
      });
    }
  };

  return <div onClick={onLike}>{LikeIcons()}</div>;
}

export default Like;
