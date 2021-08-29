import React from "react";
import { Link } from "react-router-dom";

function GridCards(props) {
  console.log("props : ", props);
  return (
    <div className="col-lg-3 col-md-6 col-sm-12">
      <div className="text-center justify-content-center m-auto">
        <Link
          className="text-decoration-none"
          to={`/movie/detail/${props.movieId}`}
        >
          <img
            className="text-center mt-4"
            style={{ width: "200px", height: "300px" }}
            src={props.image}
            alt={props.movieName}
          />
          <div class="text-white w-100">{props.movieName}</div>
        </Link>
      </div>
    </div>
  );
}

export default GridCards;
