import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { API_KEY, API_URL } from "../../config/config";

function MovieGenresPage(props) {
  const [MovieData, setMovieData] = useState([]);
  const [Page, setPage] = useState(1);
  const genresId = props.match.params.genresId;
  console.log("genresId : ", genresId);

  useEffect(() => {
    const moiveData = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
    axios.get(moiveData).then((res) => {
      console.log("66666666 : ", MovieData.length);
      let movies = res.data.results;
      movies.map((movie) => {
        let genres = movie.genre_ids;
        genres.map((genre) => {
          let result = String(genre) === genresId;
          if (result) {
            setMovieData((MovieData) => [...MovieData, movie]);
          }
        });
      });
      // for (let n = 0; n < 20; n++) {
      //   for (let m = 0; m < 5; m++) {
      //     let result = String(movies[n].genre_ids[m]) === genresId;
      //     console.log("result data 1111: ", result);
      //     if (result) {
      //       setMovieData((MovieData) => [...MovieData, movies[n]]);
      //     }
      //   }
      // }
    });
  }, []);
  console.log("MovieData2222222 : ", MovieData);

  return <div></div>;
}

export default withRouter(MovieGenresPage);
