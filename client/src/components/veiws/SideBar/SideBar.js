import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { headerUserName } from "../../../_actions/userAction";

function SideBar() {
  const dispatch = useDispatch();
  const [Name, setName] = useState("");

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
          <label
            style={{ paddingLeft: "5%", fontWeight: "bold" }}
            className="text-center pb-2 pt-2"
          >
            {Name} 님
          </label>

          <div className="d-flex flex-column">
            <div style={{ margin: "3%" }} className="text-center">
              <a
                style={{ padding: "3%" }}
                className="text-decoration-none text-dark"
                href=""
              >
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
      <div className="d-flex flex-column pb-3">
        <label
          style={{ paddingLeft: "5%", fontWeight: "bold" }}
          className="border-top border-dark pb-2 pt-2"
        >
          HOME
        </label>
        <div className="d-flex flex-column" style={{ paddingLeft: "20%" }}>
          <a className="text-decoration-none text-dark" href="">
            전체
          </a>
        </div>
      </div>
      <div className="d-flex flex-column pb-3">
        <label
          style={{ paddingLeft: "5%", fontWeight: "bold" }}
          className="border-top border-dark pb-2 pt-2"
        >
          LOL 뉴스 정보
        </label>
        <div className="d-flex flex-column" style={{ paddingLeft: "20%" }}>
          <a className="text-decoration-none text-dark pb-2" href="">
            챔피언 공략 게시판
          </a>
          <a className="text-decoration-none text-dark pb-2" href="">
            실시간 유저 정보
          </a>
          <a className="text-decoration-none text-dark pb-2" href="">
            패치노트
          </a>
          <a className="text-decoration-none text-dark pb-2" href="">
            팁과 노하우
          </a>
          <a className="text-decoration-none text-dark" href="">
            질문 건의
          </a>
        </div>
      </div>
      <div className="d-flex flex-column pb-3">
        <label
          style={{ paddingLeft: "5%", fontWeight: "bold" }}
          className="border-top border-dark pb-2 pt-2"
        >
          커뮤니티 게시판
        </label>
        <div className="d-flex flex-column" style={{ paddingLeft: "20%" }}>
          <a className="text-decoration-none text-dark pb-2" href="">
            자유
          </a>
          <a className="text-decoration-none text-dark pb-2" href="">
            유머
          </a>
          <a className="text-decoration-none text-dark pb-2" href="">
            영상
          </a>
          <a className="text-decoration-none text-dark pb-2" href="">
            사건 사고
          </a>
          <a className="text-decoration-none text-dark pb-2 " href="">
            팬아트
          </a>
        </div>
      </div>
      <div className="d-flex flex-column">
        <label
          style={{ paddingLeft: "5%", fontWeight: "bold" }}
          className="border-top border-dark pb-2 pt-2"
        >
          LOL 파티 매칭
        </label>
        <div className="d-flex flex-column" style={{ paddingLeft: "20%" }}>
          <a className="text-decoration-none text-dark pb-2 " href="">
            솔로랭크
          </a>
          <a className="text-decoration-none text-dark pb-2 " href="">
            자유랭크
          </a>
          <a className="text-decoration-none text-dark pb-2 " href="">
            격전
          </a>
          <a className="text-decoration-none text-dark pb-2 " href="">
            칼바람
          </a>
          <a className="text-decoration-none text-dark pb-2 " href="">
            기타
          </a>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
