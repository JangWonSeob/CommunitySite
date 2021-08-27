import axios from "axios";
import React, { useState } from "react";
import { mainImage } from "../../utils";
import { withRouter } from "react-router-dom";
import MyPageSiderBar from "../Section/MyPageSiderBar";

function ChangePasswordPage(props) {
  const [NowPassword, setNowPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Message, setMessage] = useState("");

  const onChangeNewPassword = (e) => {
    setNowPassword(e.currentTarget.value);
  };
  const onChangePassword = (e) => {
    setNewPassword(e.currentTarget.value);
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // 새로운 비밀번호와 비밀번호 확인이 다르면 alert를 띄운다.
    if (NewPassword !== ConfirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    let body = {
      NowPassword,
      NewPassword,
    };
    axios.post("/api/myPage/changePassword", body).then((res) => {
      console.log(res);
      if (res.data.success) {
        alert("비밀번호 변경 완료 되었습니다.");
        props.history.push("/myPage/userData");
      } else {
        setMessage(res.data.message);
      }
    });
  };
  return (
    <div>
      <div className="text-center">{mainImage()}</div>
      <div className="d-flex justify-content-center">
        <div style={{ width: "175px", marginTop: "10px" }}>
          <MyPageSiderBar />
        </div>
        <main
          style={{ width: "52.5%", margin: "10px 0px 0px 25px" }}
          className="border border-2 justify-content-center"
        >
          <br />
          <h3 className="text-center" style={{ fontWeight: "bold" }}>
            비밀번호 변경
          </h3>
          <br /> <br />
          <form
            className="border border-dark m-auto"
            style={{ width: "80%" }}
            onSubmit={onSubmit}
          >
            <br />
            <div className="m-auto" style={{ width: "60%" }}>
              <label style={{ width: "30%" }}>현재 비밀번호 </label>
              <input
                type="password"
                style={{ width: "65%" }}
                onChange={onChangeNewPassword}
                placeholder="현재 비밀번호를 입력해주세요"
              />
              {Message ? (
                <React.Fragment>
                  <br />
                  <div className="text-center text-danger">{Message}</div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <br /> <br />
                </React.Fragment>
              )}
            </div>
            <div className="m-auto" style={{ width: "60%" }}>
              <label style={{ width: "30%" }}>새 비밀번호</label>
              <input
                type="password"
                style={{ width: "65%" }}
                onChange={onChangePassword}
                placeholder="새로운 비밀번호를 입력해주세요"
              />
              <br /> <br />
            </div>
            <div className="m-auto" style={{ width: "60%" }}>
              <label style={{ width: "30%" }}>새 비밀번호 확인</label>
              <input
                type="password"
                style={{ width: "65%" }}
                onChange={onChangeConfirmPassword}
                placeholder="비밀번호를 확인해주세요"
              />
              <br /> <br />
            </div>
            <div className="text-center">
              영문 대소문자, 숫자, 특수 기호 조합 사용할 수 있습니다.
              <br />
              개인정보에 관련된 숫자나 연속된 숫자 등 쉬운 비밀번호는 타인이
              쉽게 알아 낼 수 있습니다.
              <br />
              비밀번호는 가급적 주기적을 변경 바랍니다.
            </div>
            <br />
            <button
              className="d-block bg-dark text-white rounded border-0 outline-0 p-2 m-auto"
              style={{ width: "120px" }}
              type="submit"
            >
              비밀번호 변경
            </button>
            <br /> <br />
          </form>
        </main>
      </div>
    </div>
  );
}

export default withRouter(ChangePasswordPage);
