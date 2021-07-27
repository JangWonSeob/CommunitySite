import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../_actions/userAction";
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faLock } from "@fortawesome/free-solid-svg-icons";

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginSuccess);

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };
    dispatch(loginUser(body)).then((res) => {
      // console.log("res.payload login : ", res.payload.id);
      if (res.payload.loginSuccess) {
        window.localStorage.setItem("userId", res.payload.id);
        window.location.replace("/"); //home화면으로 넘어갈 때 새로고침을 한다.
      } else {
        alert("Error");
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
        height: "80vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column", width: "25%" }}
        onSubmit={onSubmit}
      >
        <h2 style={{ textAlign: "center" }}>로 그 인</h2> <br /> <br />
        <label style={{ fontSize: "20px" }}>
          <FontAwesomeIcon icon={faUsers} /> Email
        </label>
        <br />
        <input
          style={{ height: "40px" }}
          type="email"
          value={Email}
          name="email"
          onChange={onChangeEmail}
          placeholder="이메일을 입력해주세요"
        />
        <br />
        <label style={{ fontSize: "20px" }}>
          <FontAwesomeIcon icon={faLock} /> Password
        </label>
        <br />
        <input
          style={{ height: "40px" }}
          type="password"
          value={Password}
          name="password"
          onChange={onChangePassword}
          placeholder="비밀번호을 입력해주세요"
        />
        <br /> <br />
        <button
          style={{
            background: "black",
            color: "white",
            fontSize: "20px",
            width: "80%",
            margin: "auto",
            border: 0,
            outline: 0,
          }}
          type="submit"
        >
          로그인하기
        </button>
        <br /> <br />
        <div style={{ display: "flex", color: "black" }}>
          <a
            style={{
              width: "30%",
              textAlign: "center",
              color: "black",
              textDecoration: "none",
            }}
            href=""
          >
            아이디 찾기
          </a>
          <a
            style={{
              width: "40%",
              textAlign: "center",
              color: "black",
              textDecoration: "none",
            }}
            href=""
          >
            비밀번호 변경
          </a>
          <a
            style={{
              width: "30%",
              textAlign: "center",
              color: "black",
              textDecoration: "none",
            }}
            href="/register"
          >
            회원가입
          </a>
        </div>
      </form>
    </div>
  );
};
export default withRouter(LoginPage);
