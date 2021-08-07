import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../config/config";
import GridCards from "../commons/GridCards";

function MoviePage() {
  const [Movie, setMovie] = useState([]);
  const [Page, setPage] = useState(0);

  useEffect(() => {
    const moiveData = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;

    fetchMovies(moiveData);
  }, []);

  const fetchMovies = (moiveData) => {
    axios.get(moiveData).then((res) => {
      console.log("Movie data22222 : ", res.data.results);
      setMovie((Movie) => [...Movie, res.data.results]);
      setPage(res.data.page);
    });
  };
  console.log("Movie : ", Movie);

  const loadMoreMovies = () => {
    const moiveData = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=${
      Page + 1
    }`;

    fetchMovies(moiveData);
  };
  console.log("Page : ", Page);

  const renderGridCard = Movie.map((movies, index) =>
    movies.map((movie, index) => (
      <React.Fragment key={index}>
        <GridCards
          image={
            movie.poster_path
              ? `${IMAGE_BASE_URL}w200${movie.poster_path}`
              : null
          }
          movieId={movie.id}
          movieName={movie.title}
        />
      </React.Fragment>
    ))
  );

  //   console.log("Movie data : ", Movie);

  return (
    <div>
      <div className="row">{Movie && renderGridCard}</div>
      <div className="text-center">
        <button onClick={loadMoreMovies}>Load More</button>
      </div>
      {/* <div className="text-center justify-content-between"></div> */}
    </div>
  );
}

export default MoviePage;
