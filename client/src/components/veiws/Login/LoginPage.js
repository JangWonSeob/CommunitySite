import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../actions/userAction";
import { withRouter } from "react-router-dom";

const LoginPage = (props) => {
  const dispatch = useDispatch();

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
      console.log("res.payload : ", res.payload);
      if (res.payload.loginSuccess) {
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
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmit}
      >
        <label>Email</label>
        <input
          type="email"
          value={Email}
          name="email"
          onChange={onChangeEmail}
        />
        <label>Password</label>
        <input
          type="password"
          value={Password}
          name="password"
          onChange={onChangePassword}
        />
        <button type="submit">로그인하기</button>
      </form>
    </div>
  );
};
export default withRouter(LoginPage);
