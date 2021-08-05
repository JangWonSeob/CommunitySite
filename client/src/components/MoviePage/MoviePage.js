import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../config/config";
import GridCards from "../commons/GridCards";

function MoviePage() {
  const [MovieList, setMovieList] = useState([]);
  const [Movie, setMovie] = useState([]);

  useEffect(() => {
    const moiveData = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
    axios.get(moiveData).then((res) => {
      console.log("Movie data22222 : ", res.data.results);
      setMovie(res.data.results);
    });
  }, []);

  const renderGridCard = Movie.map((movie, index) => (
    <React.Fragment key={index}>
      <GridCards
        image={
          movie.poster_path ? `${IMAGE_BASE_URL}w200${movie.poster_path}` : null
        }
        movieId={movie.id}
        movieName={movie.title}
      />
    </React.Fragment>
  ));

  //   console.log("Movie data : ", Movie);

  return (
    <div>
      <div className="row">{Movie && renderGridCard}</div>
      <div className="text-center justify-content-between">
        <a href="">1</a>
        <a href="">2</a>
        <a href="">3</a>
        <a href="">4</a>
        <a href="">5</a>
      </div>
    </div>
  );
}

export default MoviePage;
