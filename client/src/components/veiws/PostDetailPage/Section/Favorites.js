import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

function Favorites({ postId }) {
  const [Favorites, setFavorites] = useState(false);
  const [Login, setLogin] = useState(false);

  useEffect(() => {
    let variable = {
      postNumber: postId,
    };
    // 로그인 여부 확인, 즐겨찾기 여부 확인
    axios.post("/api/post/favorite", variable).then((res) => {
      console.log("111111111 : ", res.data);
      if (res.data.logining) {
        setLogin(res.data.logining);
        setFavorites(res.data.liked);
      }
    });
  }, []);

  console.log("Login : ", Login);

  const FavoritesIcons = () => {
    if (Login) {
      // 로그인 상태에서만 즐겨찾기 버튼이 보인다.
      if (Favorites) {
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
  const onFavorites = () => {
    let variable = {
      postNumber: postId,
    };
    if (!Favorites) {
      // 즐가찾기가 되어 있지 않다면 클릭하면 즐겨찾기 추가
      axios.post("/api/post/favorites", variable).then((res) => {
        if (res.data.success) {
          setFavorites(!Favorites);
        }
      });
    } else {
      // 즐가찾기가 되어 있다면 클릭하면 즐겨찾기 삭제
      axios.post("/api/post/unFavorites", variable).then((res) => {
        if (res.data.success) {
          setFavorites(!Favorites);
        }
      });
    }
  };

  return <div onClick={onFavorites}>{FavoritesIcons()}</div>;
}

export default Favorites;
