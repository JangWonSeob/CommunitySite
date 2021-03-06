import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { headerUserName } from "../../../_actions/userAction";
import { category } from "../../../_actions/postAction";
import { withRouter } from "react-router-dom";

function SideBar(props) {
  const dispatch = useDispatch();
  const [Name, setName] = useState("");
  const [Category, setCategory] = useState([]);

  useEffect(() => {
    dispatch(headerUserName()).then((res) => {
      if (res.payload.user.loginSuccess) {
        setName(res.payload.user.name);
        //console.log(res.payload.user.name);
      } else {
        alert("유저 이름을 가져오지 못했습니다.");
      }
    });
    dispatch(category()).then((res) => {
      //console.log("category : ", res.payload);
      if (res.payload.success) {
        setCategory(res.payload.category);
        //console.log(res.payload.category);
      } else {
        alert("카테고리 정보를 불러오지 못했습니다.");
      }
    });
  }, []);

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="border border-dark"
    >
      {Name ? (
        <div className="d-flex flex-column pb-3">
          <Link to="/myPage/userData" className="text-center">
            <label
              style={{
                fontWeight: "bold",
                cursor: "pointer",
              }}
              className="text-center pb-2 pt-3"
            >
              {Name} 님
            </label>
          </Link>

          <div className="d-flex flex-column">
            <div style={{ margin: "3%" }} className="text-center">
              <Link
                style={{}}
                className="text-decoration-none text-dark"
                to="/myPage/userData"
              >
                마이페이지
              </Link>
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
            <Link
              className="m-auto text-decoration-none text-center w-75 border-0 outline-0 text-white"
              style={{
                padding: "3% 0% 3% 0%",
                background: "green",
              }}
              to="/login"
            >
              로그인
            </Link>
            <div style={{ margin: "3%" }} className="text-center">
              <Link
                style={{ padding: "3%" }}
                className="text-decoration-none text-dark"
                to="/register"
              >
                회원가입
              </Link>
              <Link
                style={{ padding: "3%" }}
                className="text-decoration-none text-dark"
                to=""
              >
                ID/PW 찾기
              </Link>
            </div>
          </div>
        </div>
      )}
      <div
        className="d-flex flex-column border-top border-dark pt-2"
        style={{ paddingLeft: "15%" }}
      >
        <Link className="text-decoration-none text-dark pb-2 " to="/everyPost">
          - 전체게시글
        </Link>
        <Link className="text-decoration-none text-dark pb-2" to="">
          - 인기게시글
        </Link>
      </div>
      <div className="d-flex flex-column pb-3">
        <label
          style={{ paddingLeft: "5%", fontWeight: "bold" }}
          className="border-top border-dark pb-2 pt-2"
        >
          영화 정보
        </label>
        <div className="d-flex flex-column" style={{ paddingLeft: "15%" }}>
          <Link
            className="text-decoration-none text-dark pb-2"
            to={Category.length && `/category=${Category[1].categoryName}`}
          >
            - 영화 리뷰
          </Link>
          <Link
            className="text-decoration-none text-dark pb-2"
            to={Category.length && `/category=${Category[2].categoryName}`}
          >
            - 영화 토론
          </Link>
          <Link
            className="text-decoration-none text-dark pb-2"
            to={Category.length && `/category=${Category[3].categoryName}`}
          >
            - 영화 시사회
          </Link>
          <Link
            className="text-decoration-none text-dark"
            to={Category.length && `/category=${Category[4].categoryName}`}
          >
            - 질문 및 건의
          </Link>
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
          <Link
            className="text-decoration-none text-dark pb-2"
            to={Category.length && `/category=${Category[5].categoryName}`}
          >
            - 자유
          </Link>
          <Link
            className="text-decoration-none text-dark pb-2"
            to={Category.length && `/category=${Category[6].categoryName}`}
          >
            - 사건사고
          </Link>
          <Link
            className="text-decoration-none text-dark"
            to={Category.length && `/category=${Category[7].categoryName}`}
          >
            - 팬아트
          </Link>
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
          <Link
            className="text-decoration-none text-dark pb-2"
            to={Category.length && `/category=${Category[8].categoryName}`}
          >
            - 주변 맛집
          </Link>
          <Link
            className="text-decoration-none text-dark pb-2"
            to={Category.length && `/category=${Category[9].categoryName}`}
          >
            - 주변 볼거리
          </Link>
          <Link
            className="text-decoration-none text-dark pb-2"
            to={Category.length && `/category=${Category[10].categoryName}`}
          >
            - 영화 속 성지순례
          </Link>
          <Link
            className="text-decoration-none text-dark pb-2"
            to={Category.length && `/category=${Category[11].categoryName}`}
          >
            - 영화 굿즈
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SideBar);
