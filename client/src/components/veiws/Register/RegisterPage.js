import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/userAction";
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUsers, faLock } from "@fortawesome/free-solid-svg-icons";

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onChangeName = (event) => {
    setName(event.currentTarget.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onChangeConfirmPassword = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        props.history.push("/login");
      } else {
        alert("Error");
      }
    });
  };

  return (
    <div
      className="d-flex justify-content-center w-100 align-items-center"
      style={{
        height: "70vh",
      }}
    >
      <form className="d-flex flex-column w-25" onSubmit={onSubmit}>
        <label style={{ fontSize: "20px", fontWeight: "bold" }}>
          <FontAwesomeIcon icon={faEnvelope} /> Email
        </label>
        <br />
        <input
          className="rounded"
          style={{ height: "40px" }}
          type="email"
          value={Email}
          onChange={onChangeEmail}
          placeholder="이메일을 입력해주세요"
        />
        <br />
        <label className="h5" style={{ fontWeight: "bold" }}>
          <FontAwesomeIcon icon={faUsers} /> Name
        </label>
        <br />
        <input
          className="rounded"
          style={{ height: "40px" }}
          type="name"
          value={Name}
          onChange={onChangeName}
          placeholder="닉네임을 입력해주세요"
        />
        <br />
        <label className="h5" style={{ fontWeight: "bold" }}>
          <FontAwesomeIcon icon={faLock} /> Password
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
          회원가입
        </button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
