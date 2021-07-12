import React, { useEffect } from "react";
import axios from "axios";

function LandingPage(props) {
  useEffect(() => {
    axios.get("api/home").then((res) => {
      console.log("res : ", res);
    });
  }, []);
  const onClick = () => {
    axios.get("/api/user/logout").then((res) => {
      console.log(res.data.logoutSuccess);
      if (res.data.logoutSuccess) {
        props.history.push("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
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
      <button onClick={onClick}>로그아웃</button>
    </div>
  );
}

export default LandingPage;