import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../config/config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";

function MovieCastPage(props) {
  const [MovieData, setMovieData] = useState([]);
  const [Cast, setCast] = useState([]);
  let movieId = props.match.params.movieId;
  useEffect(() => {
    const movieDetail = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;
    axios.get(movieDetail).then((res) => {
      console.log("movie detail : ", res.data);
      setMovieData(res.data);
    });
    const movieCredits = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=ko-KR`;
    axios.get(movieCredits).then((res) => {
      console.log("cast Page : ", res.data);
      setCast(res.data.cast);
    });
  }, []);

  return (
    <div>
      <div className="d-flex w-50 m-auto">
        <Link
          to={`/movie/detail/${movieId}`}
          className="h4 text-decoration-none text-dark"
        >
          <img
            src={`${IMAGE_BASE_URL}w200${MovieData.poster_path}`}
            style={{ width: "70px", height: "105px", borderRadius: "5px" }}
          />
        </Link>
        <div className="ms-4 mt-3 mb-3">
          <Link
            to={`/movie/detail/${movieId}`}
            className="h4 text-decoration-none text-dark"
          >
            <div className="h2" style={{ fontWeight: "bold" }}>
              {MovieData.title}
            </div>
            <FontAwesomeIcon icon={faAngleDoubleLeft} /> 메인으로 돌아가기
          </Link>
        </div>
      </div>

      <div className="w-50 m-auto">
        <h3 className="mt-5 mb-5">
          출연진 <span className="h5">{Cast.length}</span>
        </h3>
        <div className="row">
          {Cast.map((cast, index) => (
            <div key={index} className="d-flex col-6 mb-2 m-auto">
              <img
                style={{ width: "50px", height: "75px", borderRadius: "5px" }}
                src={
                  cast.profile_path
                    ? `${IMAGE_BASE_URL}w200${cast.profile_path}`
                    : "/image/userimg.png"
                }
                alt="err"
              ></img>
              <div className="mt-3 mb-3 ms-4">
                <div style={{ fontWeight: "bold" }}>{cast.name}</div>
                <div>{cast.character}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withRouter(MovieCastPage);
