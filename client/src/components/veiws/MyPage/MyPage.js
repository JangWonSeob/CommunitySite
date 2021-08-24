import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userData } from "../../../_actions/userAction";
import { withRouter } from "react-router-dom";
import MyPageSiderBar from "./Section/MyPageSiderBar";

import { mainImage } from "../utils";
import axios from "axios";

function MyPage(props) {
  const dispatch = useDispatch();

  const [UserData, setUserData] = useState([]);
  const [Name, setName] = useState();
  const [SocialLogin, setSocialLogin] = useState(false);
  const [Message, setMessage] = useState("");

  useEffect(() => {
    dispatch(userData()).then((res) => {
      console.log("mypage", res.payload);
      if (res.payload.success) {
        setUserData(res.payload.userData);
        setName(res.payload.userData.name);
        // setSocialLogin(res.payload.socialLogin);
      }
    });
  }, []);

  console.log("SocialLogin : ", SocialLogin);

  const onChangeName = (e) => {
    setName(e.currentTarget.value);
  };
  const onClickName = (e) => {
    e.preventDefault();
  };
  const onClickPassword = (e) => {
    e.preventDefault();
    props.history.push("/");
  };
  const onSubmit = (e) => {
    e.preventDefault();

    let variable = {
      name: Name,
    };
    axios.post("/api/myPage/changeName", variable).then((res) => {
      if (res.data.success) {
        alert(
          `닉네임이 변경되었습니다. 
적용을 위해서 다시 로그인 후 이용 바랍니다.`
        );
        props.history.push("/");
      } else if (res.data.message) {
        setMessage(res.data.message);
      } else {
        alert("닉네임 변경에 실패하였습니다.");
      }
    });
  };

  return (
    <div className="d-flex flex-column">
      <div className="text-center">{mainImage()}</div>
      <div className="d-flex justify-content-center">
        <div style={{ width: "175px", marginTop: "10px" }}>
          <MyPageSiderBar />
        </div>
        <main
          style={{ width: "52.5%", margin: "10px 0px 0px 25px" }}
          className="border border-2"
        >
          <br />
          <h3 style={{ fontWeight: "bold", paddingLeft: "60px" }}>
            내 정보 관리
          </h3>
          <br /> <br />
          <form style={{ padding: "0px 60px" }} onSubmit={onSubmit}>
            <div>
              <div className="border border-dark">
                <label
                  style={{
                    width: "155px",
                    height: "72px",
                    padding: "25px 0px 25px 15px",
                    background: "#ebebeb",
                    marginRight: "46px",
                    fontWeight: "bold",
                  }}
                >
                  이메일
                </label>
                <span style={{ padding: "25px 0px" }}>{UserData.email}</span>
              </div>
              <div className="border border-dark">
                <label
                  style={{
                    width: "155px",
                    height: "72px",
                    padding: "25px 0px 25px 15px",
                    background: "#ebebeb",
                    marginRight: "46px",
                    fontWeight: "bold",
                  }}
                >
                  생성일자
                </label>
                <span style={{ padding: "25px 0px" }}>{UserData.date}</span>
              </div>
              <div className="border border-dark">
                <label
                  htmlFor="name"
                  style={{
                    width: "155px",
                    height: "72px",
                    padding: "25px 0px 25px 15px",
                    background: "#ebebeb",
                    marginRight: "46px",
                    fontWeight: "bold",
                  }}
                >
                  닉네임
                </label>
                <input id="name" value={Name || ""} onChange={onChangeName} />
                <button
                  className="bg-dark text-white rounded border-0 outline-0 p-2 ms-5 me-4"
                  style={{ width: "120px" }}
                  type="submit"
                >
                  닉네임 변경
                </button>
                {Message && <span>{Message}</span>}
              </div>
              <div className="border border-dark">
                <label
                  style={{
                    width: "155px",
                    height: "72px",
                    padding: "25px 0px 25px 15px",
                    background: "#ebebeb",
                    marginRight: "46px",
                    fontWeight: "bold",
                  }}
                >
                  비밀번호
                </label>
                {SocialLogin ? (
                  <span>소셜로 로그인하여 비밀번호가 존재하지 않습니다.</span>
                ) : (
                  <React.Fragment>
                    <span>비밀번호 변경 페이지로 이동</span>
                    <button
                      className="bg-dark text-white rounded border-0 outline-0 p-2 ms-3"
                      style={{ width: "120px" }}
                      onClick={onClickPassword}
                    >
                      비밀번호 변경
                    </button>
                  </React.Fragment>
                )}
              </div>
              <div className="d-flex border border-dark">
                <React.Fragment>
                  <label
                    style={{
                      width: "155px",
                      height: "72px",
                      padding: "25px 0px 25px 15px",
                      background: "#ebebeb",
                      marginRight: "46px",
                      fontWeight: "bold",
                    }}
                  >
                    이메일 수신
                  </label>
                </React.Fragment>
                <div className="d-flex">
                  <input
                    style={{ margin: "30px 10px 30px 0px" }}
                    type="checkbox"
                  />
                  <div style={{ margin: "12px 0px" }}>
                    본 사이트의 소식 및 이벤트 알림을 메일로 받겠습니다.
                    <br /> 주요 공지 사항 및 이벤트 당첨 안내 등은 알림 설정에
                    관게없이 발송됩니다.
                  </div>
                </div>
              </div>
              {/* <button
                className="h5 bg-dark text-white rounded border-0 outline-0 text-center d-block m-auto mt-4 p-3"
                type="submit"
              >
                저장하기
              </button> */}
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default withRouter(MyPage);
