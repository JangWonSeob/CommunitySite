import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendEmail, forgetPassword } from "../../../_actions/userAction";
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

function ForgetPassword(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [ServerAuth, setServerAuth] = useState("");
  const [ClientAuth, setClientAuth] = useState();

  const [Auth, setAuth] = useState(false);
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  console.log("client : ", Email);

  const onChangeEmail = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onChangeAuth = (e) => {
    setClientAuth(e.currentTarget.value);
  };
  const onClick = (e) => {
    e.preventDefault();
    if (Email === "") {
      alert("이메일을 입력해주세요");
    } else {
      console.log("email : ", Email);
      let body = {
        email: Email,
      };
      dispatch(sendEmail(body)).then((res) => {
        console.log(res.payload);
        if (res.payload.message) {
          alert(res.payload.message);
        }
        if (res.payload.success) {
          setServerAuth(res.payload.auth);
        }
      });
    }
  };

  const onClickNext = (e) => {
    e.preventDefault();
    if (Email === "") {
      alert("이메일을 입력해주세요");
    } else {
      if (ServerAuth === ClientAuth) {
        setAuth(true);
      } else {
        alert("인증번호가 일치하지 않습니다.");
      }
    }
  };

  const onChangePassword = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onChangeConfirmPassword = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    let body = {
      email: Email,
      password: Password,
    };
    dispatch(forgetPassword(body)).then((res) => {
      console.log(res.payload);
      if (res.payload.success) {
        props.history.push("/login");
      }
    });
  };
  return (
    <div
      className="d-flex justify-content-center w-100 align-items-center"
      style={{
        height: "60vh",
      }}
    >
      {!Auth ? (
        <form className="d-flex flex-column w-25">
          <h2 className="text-center" style={{ fontWeight: "bold" }}>
            비밀번호 변경
          </h2>
          <br /> <br />
          <label htmlFor="email" className="h5" style={{ fontWeight: "bold" }}>
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </label>
          <br />
          <div className="d-flex">
            <input
              className="rounded"
              style={{
                height: "40px",
                width: "80%",
              }}
              id="email"
              type="email"
              name="email"
              onChange={onChangeEmail}
              placeholder="이메일을 입력해주세요"
            />
            <button
              className="h6 text-white bg-dark m-auto rounded border-0 outline-0"
              style={{ height: "40px", width: "20%" }}
              onClick={onClick}
            >
              인증하기
            </button>
          </div>
          <br /> <br />
          <input
            className="rounded"
            style={{ height: "40px" }}
            type="text"
            name="auth"
            onChange={onChangeAuth}
            placeholder="인증번호를 입력해주세요"
          />
          <br /> <br />
          <button
            className="h5 text-white bg-dark w-50 m-auto rounded border-0 outline-0"
            style={{
              height: "40px",
            }}
            onClick={onClickNext}
          >
            다 음
          </button>
          <br /> <br /> <br />
        </form>
      ) : (
        <form className="d-flex flex-column w-25" onSubmit={onSubmit}>
          <label className="h5" style={{ fontWeight: "bold" }}>
            <FontAwesomeIcon icon={faLock} /> New Password
          </label>
          <br />
          <input
            className="rounded"
            style={{ height: "40px" }}
            type="password"
            value={Password}
            onChange={onChangePassword}
            placeholder="비밀번호을 입력해주세요"
          />
          <br />
          <label className="h5" style={{ fontWeight: "bold" }}>
            <FontAwesomeIcon icon={faLock} /> Confirm Password
          </label>
          <br />
          <input
            className="rounded"
            style={{ height: "40px" }}
            type="password"
            value={ConfirmPassword}
            onChange={onChangeConfirmPassword}
            placeholder="비밀번호을 확인해주세요"
          />
          <br /> <br /> <br />
          <button
            className="h5 text-white bg-dark w-75 m-auto rounded border-0 outline-0"
            style={{
              height: "40px",
            }}
            type="submit"
          >
            변경하기
          </button>
        </form>
      )}
    </div>
  );
}

export default withRouter(ForgetPassword);
