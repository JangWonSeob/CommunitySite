import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../_actions/userAction";
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

// import { GoogleLogin, GoogleLogout } from "react-google-login";
// import axios from "axios";

// const responseGoogle = (res) => {
//   let googleData = {
//     email: res.profileObj.email,
//     name: res.profileObj.name,
//     googleId: res.profileObj.googleId,
//   };
//   console.log(googleData);
//   axios.post("/api/user/googleLogin", googleData).then((res) => {
//     console.log("res.data google : ", res.data.rows[0].id);
//     if (res.data.success) {
//       window.localStorage.setItem("userId", res.data.rows[0].id);
//       window.location.replace("/");
//     } else {
//       alert("No data");
//     }
//   });
// };
// const logout = () => {
//   console.log();
// };

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
      console.log("res.payload login : ", res.payload);
      console.log("res.payload login 222 : ", res.payload.id);
      if (res.payload.loginSuccess) {
        // console.log("length : ", res.payload.id.length);
        // console.log("userId : typeof ", typeof res.payload.id, res.payload.id);
        window.location.replace("/"); //home화면으로 넘어갈 때 새로고침을 한다.
      } else {
        alert("Error");
      }
    });
  };

  return (
    <div
      className="d-flex justify-content-center w-100 align-items-center flex-column"
      style={{
        height: "80vh",
      }}
    >
      <form className="d-flex flex-column w-25" onSubmit={onSubmit}>
        <h2 className="text-center" style={{ fontWeight: "bold" }}>
          로 그 인
        </h2>
        <br /> <br />
        <label className="h5" style={{ fontWeight: "bold" }}>
          <FontAwesomeIcon icon={faEnvelope} /> Email
        </label>
        <br />
        <input
          className="rounded"
          style={{
            height: "40px",
          }}
          type="email"
          value={Email}
          name="email"
          onChange={onChangeEmail}
          placeholder="이메일을 입력해주세요"
        />
        <br />
        <label className="h5 " style={{ fontWeight: "bold" }}>
          <FontAwesomeIcon icon={faLock} /> Password
        </label>
        <br />
        <input
          className="rounded"
          style={{ height: "40px" }}
          type="password"
          value={Password}
          name="password"
          onChange={onChangePassword}
          placeholder="비밀번호을 입력해주세요"
        />
        <br /> <br />
        <button
          className="h5 text-white bg-dark w-75 m-auto rounded border-0 outline-0"
          style={{
            height: "40px",
          }}
          type="submit"
        >
          로그인
        </button>
        <br /> <br /> <br />
      </form>
      <div className="d-flex text-dark justify-content-between w-25">
        <a
          className="w-100 text-center  text-dark text-decoration-none"
          style={{
            fontWeight: "bold",
          }}
          href=""
        >
          아이디찾기
        </a>
        <a
          className="w-100 text-center  text-dark text-decoration-none"
          style={{
            fontWeight: "bold",
          }}
          href="/forgetPassWord"
        >
          비밀번호변경
        </a>
        <a
          className="w-100 text-center  text-dark text-decoration-none"
          style={{
            fontWeight: "bold",
          }}
          href="/register"
        >
          회원가입
        </a>
      </div>
      <br /> <br />
      <div>
        <div style={{ marginTop: "4%" }} className="text-center">
          {/* <GoogleLogin
              style={{ width: "200px" }}
              clientId={google.web.client_id}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            /> */}
          {/* <GoogleLogout
              className="m-auto"
              clientId={google.web.client_id}
              buttonText="Logout"
              onLogoutSuccess={logout}
            /> */}
        </div>
      </div>
      <div>
        <a href="/api/user/login/auth/google">
          <img src="image/test.png" alt="error" />
        </a>
      </div>
      {/* <div>
        <a href="/api/user/login/auth/kakao">kakao login</a>
      </div> */}
      <div>
        <a href="/api/user/login/auth/naver">naver login</a>
      </div>
      {/* <div>
        <a href="/api/user/login/auth/facebook">facebook login</a>
      </div> */}
    </div>
  );
};
export default withRouter(LoginPage);
