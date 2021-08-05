import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../config/config";

function MovieGenresPage(props) {
  const [MovieData, setMovieData] = useState([]);
  const [Movies, setMovies] = useState([]);
  const genresId = props.match.params.genresId;
  console.log("genresId : ", genresId);

  useEffect(() => {
    const moiveData = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
    axios.get(moiveData).then((res) => {
      let result = res.filter(res);
      // console.log("Movie data22222 : ", res.data.results);
      // console.log("Movie data33333 : ", res.data.results[0].genre_ids);
      // let movies = res.data.results;
      // for (let n = 0; n < 20; n++) {
      //   // console.log(movies[n].genre_ids);
      //   for (let m = 0; m < 5; m++) {
      //     let result = String(movies[n].genre_ids[m]) === genresId;
      //     // console.log("result data 1111: ", result);
      //     if (result) {
      //       setMovieData([...MovieData, movies[n]]);
      //       console.log("setMovieData : ", movies[n]);
      //     }
      //   }
      // }
    });
  }, []);
  console.log("MovieData2222222 : ", MovieData);
  // {
  //   MovieData && setMovies([...Movies, MovieData]);
  // }
  // console.log("MovieData3333333 : ", Movies);
  return <div></div>;
}

export default withRouter(MovieGenresPage);
