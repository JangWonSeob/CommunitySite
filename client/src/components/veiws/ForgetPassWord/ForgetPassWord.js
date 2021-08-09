import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendEmail, changePassword } from "../../../_actions/userAction";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUsers, faLock } from "@fortawesome/free-solid-svg-icons";

function ForgetPassWord() {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };
  const onClick = (e) => {
    e.preventDefault();
    console.log("email : ", Email);
    let body = {
      email: Email,
    };
    dispatch(sendEmail(body)).then((res) => {
      console.log(res.payload);
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="d-flex justify-content-center w-100 align-items-center">
      <form className="d-flex flex-column w-25" onSubmit={onSubmit}>
        <h2 className="text-center" style={{ fontWeight: "bold" }}>
          비밀번호 변경
        </h2>
        <br /> <br />
        <label className="h5" style={{ fontWeight: "bold" }}>
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
            type="email"
            value={Email}
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
        <br /> <br />
        <button
          className="h5 text-white bg-dark w-75 m-auto rounded border-0 outline-0"
          style={{
            height: "40px",
          }}
          type="submit"
        >
          변경하기
        </button>
        <br /> <br /> <br />
      </form>
    </div>
  );
}

export default ForgetPassWord;
