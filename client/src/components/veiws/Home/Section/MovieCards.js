import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../../../config/config";

function MovieCards() {
  const [PopularMovie, setPopularMovie] = useState([]);
  const [NewMovie, setNewMovie] = useState([]);
  const [TopMovie, setTopMovie] = useState([]);
  const [NextMovie, setNextMovie] = useState([]);
  const [Category, setCategory] = useState(1);
  useEffect(() => {
    const moiveData = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
    axios.get(moiveData).then((res) => {
      setPopularMovie([
        res.data.results[0],
        res.data.results[1],
        res.data.results[2],
        res.data.results[3],
        res.data.results[4],
      ]);
    });
    console.log("Movie cccc : ", PopularMovie);
    const moiveData1 = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`;
    axios.get(moiveData1).then((res) => {
      setNewMovie([
        res.data.results[0],
        res.data.results[1],
        res.data.results[2],
        res.data.results[3],
        res.data.results[4],
      ]);
    });
    const moiveData2 = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`;
    axios.get(moiveData2).then((res) => {
      setTopMovie([
        res.data.results[0],
        res.data.results[1],
        res.data.results[2],
        res.data.results[3],
        res.data.results[4],
      ]);
    });
    const moiveData3 = `${API_URL}movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1`;
    axios.get(moiveData3).then((res) => {
      setNextMovie([
        res.data.results[0],
        res.data.results[1],
        res.data.results[2],
        res.data.results[3],
        res.data.results[4],
      ]);
    });
  }, []);

  const renderGridCard = () => {
    if (Category === 1) {
      return popularGridCard;
    } else if (Category === 2) {
      return newGridCard;
    } else if (Category === 3) {
      return topGridCard;
    } else if (Category === 4) {
      return nextGridCard;
    }
  };

  const popularGridCard = PopularMovie.map((movie, index) => (
    <div key={index}>
      <a href={`/movie/detail/${movie.id}`}>
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}w200${movie.poster_path}`
              : null
          }
          alt={movie.title}
        />
        {/* <div>{movie.title}</div> */}
      </a>
    </div>
  ));
  const newGridCard = NewMovie.map((movie, index) => (
    <div key={index}>
      <a href={`/movie/detail/${movie.id}`}>
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}w200${movie.poster_path}`
              : null
          }
          alt={movie.title}
        />
        {/* <div>{movie.title}</div> */}
      </a>
    </div>
  ));
  const topGridCard = TopMovie.map((movie, index) => (
    <div key={index}>
      <a href={`/movie/detail/${movie.id}`}>
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}w200${movie.poster_path}`
              : null
          }
          alt={movie.title}
        />
        {/* <div>{movie.title}</div> */}
      </a>
    </div>
  ));
  const nextGridCard = NextMovie.map((movie, index) => (
    <div key={index}>
      <a href={`/movie/detail/${movie.id}`}>
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}w200${movie.poster_path}`
              : null
          }
          alt={movie.title}
        />
        {/* <div>{movie.title}</div> */}
      </a>
    </div>
  ));

  const onClickPopular = () => {
    setCategory(1);
  };
  const onClickNew = () => {
    setCategory(2);
  };
  const onClickTop = () => {
    setCategory(3);
  };
  const onClickNext = () => {
    setCategory(4);
  };

  return (
    <div className="col">
      <div className="d-flex justify-content-between w-75 m-auto">
        <button className="h4" onClick={onClickPopular}>
          인기 영화
        </button>
        <button className="h4" onClick={onClickNew}>
          현재 상영작
        </button>
        <button className="h4" onClick={onClickTop}>
          역대 인기 영화
        </button>
        <button className="h4" onClick={onClickNext}>
          상영예정
        </button>
      </div>
      <div className="d-flex justify-content-between">{renderGridCard()}</div>
    </div>
  );
}

export default MovieCards;
