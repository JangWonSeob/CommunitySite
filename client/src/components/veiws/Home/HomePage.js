import React, { useEffect, useState } from "react";
import axios from "axios";

function LandingPage(props) {
  const [name, setname] = useState("");
  useEffect(() => {
    axios.get("api/home").then((res) => {
      console.log("res : ", res);
      if (res.data.user) {
        if (res.data.user.name) {
          setname(res.data.user.name);
        }
      }
    });
  }, []);

  const onClickRegister = () => {
    props.history.push("/register");
  };

  const onClickLogin = () => {
    props.history.push("/login");
  };

  const onClickLogout = () => {
    axios.get("/api/user/logout").then((res) => {
      console.log(res.data.logoutSuccess);
      if (res.data.logoutSuccess) {
        props.history.push("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
  };
  const onClickAddPost = () => {
    props.history.push("/post/add");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작 페이지</h2>

      {name ? (
        <div>
          <h3>{name}</h3>
          <button onClick={onClickLogout}>로그아웃</button>
          <button onClick={onClickAddPost}>게시물 작성하기</button>
        </div>
      ) : (
        <div>
          <button onClick={onClickRegister}>회원가입</button>
          <button onClick={onClickLogin}>로그인</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
