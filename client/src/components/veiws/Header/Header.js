import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { headerUserName } from "../../../_actions/userAction";
import { API_KEY, API_URL } from "../../../config/config";

function Header(props) {
  const dispatch = useDispatch();
  const [Name, setName] = useState("");
  const [GenresList, setGenresList] = useState([]);
  const [MovieCategroy, setMovieCategroy] = useState(false);

  useEffect(() => {
    dispatch(headerUserName()).then((res) => {
      if (res.payload.user.loginSuccess) {
        setName(res.payload.user.name);
        // window.localStorage.setItem("userId", res.payload.user.id); //localStorage에 userId에 id 값을 저장한다. // 보안적인 이유로 제거
      } else {
        alert("유저 이름을 가져오지 못했습니다.");
      }
    });
    const genresLists = `${API_URL}genre/movie/list?api_key=${API_KEY}&language=ko-KR`;
    axios.get(genresLists).then((res) => {
      setGenresList([
        res.data.genres[0],
        res.data.genres[2],
        res.data.genres[3],
        res.data.genres[4],
        res.data.genres[5],
        res.data.genres[10],
        res.data.genres[13],
        res.data.genres[14],
      ]);
    });
  }, []);

  const onClickRegister = () => {
    props.history.push("/register");
  };

  const onClickLogin = () => {
    props.history.push("/login");
  };

  const onClickAddPost = () => {
    props.history.push("/post/add");
  };

  const onClickLogout = () => {
    axios.get("/api/user/logout").then((res) => {
      console.log(res.data.logoutSuccess);
      if (res.data.logoutSuccess) {
        // window.localStorage.removeItem("userId"); // logout할 때 localStorage에 있는 userId 삭제 // 보안적인 이유로 제거
        window.location.replace("/login"); //login페이지로 넘어갈 때 새로고침을 한다.
      } else {
        alert("로그아웃 실패");
      }
    });
  };

  const genresList = GenresList.map((genresList, index) => (
    <div className="col" key={index}>
      <Link to={`/movie/${genresList.id}`}>
        <div>{genresList.name}</div>
      </Link>
    </div>
  ));

  const MovieClick = (e) => {
    e.preventDefault();
    setMovieCategroy(!MovieCategroy);
  };

  return (
    <div className="text-center m-auto" style={{ width: "63%" }}>
      <nav
        className="navbar d-flex"
        style={{
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <div>
          <Link className="text-decoration-none text-dark" to="/">
            Logo
          </Link>
        </div>
        <div>
          <Link
            className="text-decoration-none text-dark"
            style={{ marginLeft: "50px" }}
            to=""
          >
            공지사항
          </Link>
          <Link
            className="text-decoration-none text-dark"
            style={{ marginLeft: "30px" }}
            to="/everyPost"
          >
            최신글
          </Link>
          <Link
            className="text-decoration-none text-dark"
            style={{ marginLeft: "30px" }}
            to="/movie/popular"
          >
            영화
          </Link>
          <Link
            className="text-decoration-none text-dark"
            style={{ marginLeft: "30px", cursor: "pointer" }}
            onClick={MovieClick}
          >
            영화 카테고리
          </Link>
        </div>
        {Name ? (
          <div
            style={{
              display: "flex",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                marginRight: "20px",
              }}
            >
              환영합니다. {Name} 님
            </h3>
            <div className="d-flex" style={{ height: "50%" }}>
              <button
                className="bg-dark text-white rounded border-0 outline-0"
                onClick={onClickLogout}
              >
                로그아웃
              </button>
              <button
                className="bg-dark text-white rounded border-0 outline-0"
                onClick={onClickAddPost}
              >
                게시물 작성하기
              </button>
            </div>
          </div>
        ) : (
          <div className="d-flex">
            <button
              className="bg-dark text-white rounded border-0 outline-0"
              onClick={onClickRegister}
            >
              회원가입
            </button>
            <button
              className="bg-dark text-white rounded border-0 outline-0"
              onClick={onClickLogin}
            >
              로그인
            </button>
            {/* <button
              className="bg-dark text-white rounded border-0 outline-0"
              onClick={onClickLogout}
            >
              로그아웃
            </button> */}
          </div>
        )}
      </nav>
      <div className="row text-center m-auto" style={{ width: "70%" }}>
        {MovieCategroy && genresList}
      </div>
    </div>
  );
}

export default withRouter(Header);
