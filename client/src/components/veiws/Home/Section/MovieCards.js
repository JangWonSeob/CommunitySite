import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../../../config/config";
import { Link } from "react-router-dom";

function MovieCards() {
  const [PopularMovie, setPopularMovie] = useState([]);
  const [NewMovie, setNewMovie] = useState([]);
  const [TopMovie, setTopMovie] = useState([]);
  const [NextMovie, setNextMovie] = useState([]);
  const [Category, setCategory] = useState(1);

  useEffect(() => {
    const moiveData = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
    renderMovie(moiveData, setPopularMovie);
  }, []);

  const renderMovie = (movieData, setData) => {
    axios.get(movieData).then((res) => {
      setData([
        res.data.results[0],
        res.data.results[1],
        res.data.results[2],
        res.data.results[3],
        res.data.results[4],
      ]);
    });
  };
  const renderGridCard = () => {
    if (Category === 1) {
      const popularGridCard = PopularMovie.map((movie, index) => (
        <div key={index}>
          <Link to={`/movie/detail/${movie.id}`}>
            <img
              style={{ width: "200px", height: "300px" }}
              src={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}w200${movie.poster_path}`
                  : null
              }
              alt={movie.title}
            />
            {/* <div>{movie.title}</div> */}
          </Link>
        </div>
      ));
      return popularGridCard;
    } else if (Category === 2) {
      const newGridCard = NewMovie.map((movie, index) => (
        <div key={index}>
          <Link to={`/movie/detail/${movie.id}`}>
            <img
              style={{ width: "200px", height: "300px" }}
              src={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}w200${movie.poster_path}`
                  : null
              }
              alt={movie.title}
            />
            {/* <div>{movie.title}</div> */}
          </Link>
        </div>
      ));
      return newGridCard;
    } else if (Category === 3) {
      const topGridCard = TopMovie.map((movie, index) => (
        <div key={index}>
          <Link to={`/movie/detail/${movie.id}`}>
            <img
              style={{ width: "200px", height: "300px" }}
              src={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}w200${movie.poster_path}`
                  : null
              }
              alt={movie.title}
            />
            {/* <div>{movie.title}</div> */}
          </Link>
        </div>
      ));
      return topGridCard;
    } else if (Category === 4) {
      const nextGridCard = NextMovie.map((movie, index) => (
        <div key={index}>
          <Link to={`/movie/detail/${movie.id}`}>
            <img
              style={{ width: "200px", height: "300px" }}
              src={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}w200${movie.poster_path}`
                  : null
              }
              alt={movie.title}
            />
            {/* <div>{movie.title}</div> */}
          </Link>
        </div>
      ));
      return nextGridCard;
    }
  };

  const onClickPopular = () => {
    setCategory(1);
  };
  const onClickNew = () => {
    const moiveData1 = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`;
    renderMovie(moiveData1, setNewMovie);
    setCategory(2);
  };
  const onClickTop = () => {
    const moiveData2 = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`;
    renderMovie(moiveData2, setTopMovie);
    setCategory(3);
  };
  const onClickNext = () => {
    const moiveData3 = `${API_URL}movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1`;
    renderMovie(moiveData3, setNextMovie);
    setCategory(4);
  };

  return (
    <div className="col">
      <div
        className="d-flex justify-content-between w-75 m-auto"
        style={{ padding: "20px 0px 40px 0px" }}
      >
        <button
          className="h4 text-white border-0 outline-0 bg-transparent"
          onClick={onClickPopular}
        >
          # 인기 영화
        </button>
        <button
          className="h4 text-white border-0 outline-0 bg-transparent"
          onClick={onClickNew}
        >
          # 현재 상영작
        </button>
        <button
          className="h4 text-white border-0 outline-0 bg-transparent"
          onClick={onClickTop}
        >
          # 역대 인기 영화
        </button>
        <button
          className="h4 text-white border-0 outline-0 bg-transparent"
          onClick={onClickNext}
        >
          # 상영예정
        </button>
      </div>
      <div className="d-flex justify-content-between">{renderGridCard()}</div>
    </div>
  );
}

export default MovieCards;
