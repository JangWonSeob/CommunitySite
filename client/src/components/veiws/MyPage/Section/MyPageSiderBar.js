import React from "react";
import { Link } from "react-router-dom";

function MyPageSiderBar() {
  return (
    <aside>
      <div className="d-flex flex-column border border-dark">
        <label
          style={{ fontWeight: "bold", padding: "35px 0px 35px 0px" }}
          className="text-center h4"
        >
          마이페이지
        </label>
        <div className="d-flex flex-column border-top border-dark">
          <Link
            style={{ padding: "13px 0px" }}
            className="text-decoration-none text-dark border-bottom border-dark ps-3"
            to="/"
          >
            메인 화면
          </Link>
          <Link
            style={{ padding: "13px 0px" }}
            className="text-decoration-none text-dark border-bottom border-dark ps-3"
            to="/myPage/userData"
          >
            내 정보 관리
          </Link>
          <Link
            style={{ padding: "13px 0px" }}
            className="text-decoration-none text-dark border-bottom border-dark ps-3"
            to="/"
          >
            등급 확인
          </Link>
          <Link
            style={{ padding: "13px 0px" }}
            className="text-decoration-none text-dark border-bottom border-dark ps-3"
            to="/"
          >
            내가 쓴 게시글
          </Link>
          <Link
            style={{ padding: "13px 0px" }}
            className="text-decoration-none text-dark border-bottom border-dark ps-3"
            to="/"
          >
            내가 쓴 댓글
          </Link>
          <Link
            style={{ padding: "13px 0px" }}
            className="text-decoration-none text-dark border-bottom border-dark ps-3"
            to="/"
          >
            즐겨 찾기
          </Link>
          <Link
            style={{ padding: "13px 0px" }}
            className="text-decoration-none text-dark border-bottom border-dark ps-3"
            to="/myPage/changePassword"
          >
            비밀번호 변경
          </Link>
          <Link
            style={{ padding: "13px 0px" }}
            className="text-decoration-none text-dark border-bottom border-dark ps-3"
            to="/"
          >
            회원탈퇴
          </Link>
          <Link
            style={{ padding: "13px 0px" }}
            className="text-decoration-none text-dark ps-3"
            to="/"
          >
            1:1 문의하기
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default MyPageSiderBar;
