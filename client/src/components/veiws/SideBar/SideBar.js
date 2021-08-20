import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { headerUserName } from "../../../_actions/userAction";

function SideBar() {
  const dispatch = useDispatch();
  const [Name, setName] = useState("");
  const userId = window.localStorage.getItem("userId");

  useEffect(() => {
    dispatch(headerUserName()).then((res) => {
      if (res.payload.user.loginSuccess) {
        setName(res.payload.user.name);
        console.log(res.payload.user.name);
      } else {
        alert("유저 이름을 가져오지 못했습니다.");
      }
    });
  }, []);
  return (
    <div
      // style={{ width: "11.5%" }}
      style={{ width: "11.5%", height: "100%" }}
      className="border border-dark"
    >
      {Name ? (
        <div className="d-flex flex-column pb-3">
          <a href={`/MyPage/${userId}`} className="text-center">
            <label
              style={{
                fontWeight: "bold",
                cursor: "pointer",
              }}
              className="text-center pb-2 pt-3"
            >
              {Name} 님
            </label>
          </a>

          <div className="d-flex flex-column">
            <div style={{ margin: "3%" }} className="text-center">
              <a style={{}} className="text-decoration-none text-dark" href="">
                마이페이지
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column pb-3">
          <label
            style={{ paddingLeft: "5%", fontWeight: "bold" }}
            className="text-center pb-2 pt-2"
          >
            Site Name
          </label>

          <div className="d-flex flex-column">
            <a
              className="m-auto text-decoration-none text-center w-75 border-0 outline-0 text-white"
              style={{
                padding: "3% 0% 3% 0%",
                background: "green",
              }}
              href="/login"
            >
              로그인
            </a>
            <div style={{ margin: "3%" }} className="text-center">
              <a
                style={{ padding: "3%" }}
                className="text-decoration-none text-dark"
                href="/register"
              >
                회원가입
              </a>
              <a
                style={{ padding: "3%" }}
                className="text-decoration-none text-dark"
                href=""
              >
                ID/PW 찾기
              </a>
            </div>
          </div>
        </div>
      )}
      <div
        className="d-flex flex-column border-top border-dark pt-2"
        style={{ paddingLeft: "15%" }}
      >
        <a className="text-decoration-none text-dark pb-2 " href="/everyPost">
          - 전체게시글
        </a>
        <a className="text-decoration-none text-dark pb-2" href="">
          - 인기게시글
        </a>
      </div>
      <div className="d-flex flex-column pb-3">
        <label
          style={{ paddingLeft: "5%", fontWeight: "bold" }}
          className="border-top border-dark pb-2 pt-2"
        >
          영화 정보
        </label>
        <div className="d-flex flex-column" style={{ paddingLeft: "15%" }}>
          <a className="text-decoration-none text-dark pb-2" href="">
            - 영화 리뷰
          </a>
          <a className="text-decoration-none text-dark pb-2" href="">
            - 영화 토론
          </a>
          <a className="text-decoration-none text-dark pb-2" href="">
            - 영화 시사회
          </a>
          <a className="text-decoration-none text-dark" href="">
            - 질문 및 건의
          </a>
        </div>
      </div>
      <div className="d-flex flex-column pb-3">
        <label
          style={{ paddingLeft: "5%", fontWeight: "bold" }}
          className="border-top border-dark pb-2 pt-2"
        >
          소통 게시판
        </label>
        <div className="d-flex flex-column" style={{ paddingLeft: "15%" }}>
          <a className="text-decoration-none text-dark pb-2" href="">
            - 자유
          </a>
          <a className="text-decoration-none text-dark pb-2" href="">
            - 사건사고
          </a>
          <a className="text-decoration-none text-dark" href="">
            - 팬아트
          </a>
        </div>
      </div>
      <div className="d-flex flex-column pb-3">
        <label
          style={{ paddingLeft: "5%", fontWeight: "bold" }}
          className="border-top border-dark pb-2 pt-2"
        >
          극장 수다
        </label>
        <div className="d-flex flex-column" style={{ paddingLeft: "15%" }}>
          <a className="text-decoration-none text-dark pb-2" href="">
            - 주변 맛집
          </a>
          <a className="text-decoration-none text-dark pb-2" href="">
            - 주변 볼거리
          </a>
          <a className="text-decoration-none text-dark pb-2" href="">
            - 영화 속 성지순례
          </a>
          <a className="text-decoration-none text-dark pb-2" href="">
            - 영화 굿즈
          </a>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
