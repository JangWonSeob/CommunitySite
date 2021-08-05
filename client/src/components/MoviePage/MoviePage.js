import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../config/config";
import GridCards from "../commons/GridCards";

function MoviePage() {
  const [MovieList, setMovieList] = useState([]);
  const [Movie, setMovie] = useState([]);

  useEffect(() => {
    const genresList = `${API_URL}genre/movie/list?api_key=${API_KEY}&language=ko-KR`;
    axios.get(genresList).then((res) => {
      console.log("Movie data1111 : ", res.data.genres);
      setMovieList(res.data.genres);
    });
    const moiveData = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
    axios.get(moiveData).then((res) => {
      console.log("Movie data22222 : ", res.data.results);
      setMovie(res.data.results);
    });
  }, []);

  const renderGnresList = MovieList.map((list, index) => {
    return (
      <div key={index}>
        <span>
          {list.id} : {list.name}
        </span>
      </div>
    );
  });

  const renderGridCard = Movie.map((movie, index) => (
    <React.Fragment key={index}>
      <GridCards
        image={
          movie.poster_path ? `${IMAGE_BASE_URL}w200${movie.poster_path}` : null
        }
        movieId={movie.id}
        movieName={movie.original_title}
      />
    </React.Fragment>
  ));

  //   console.log("Movie data : ", Movie);

  return (
    <div>
      {/* <div>{renderGnresList}</div> */}
      <div className="row">{Movie && renderGridCard}</div>
    </div>
  );
}

export default MoviePage;
