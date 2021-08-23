import React from "react";
import { Col } from "reactstrap";

function GridCards(props) {
  console.log("props : ", props);
  return (
    <div className="col-lg-3 col-md-6 col-sm-12">
      <div className="text-center justify-content-center m-auto">
        <a
          className="text-decoration-none"
          href={`/movie/detail/${props.movieId}`}
        >
          <img
            className="text-center mt-4"
            style={{ width: "200px", height: "300px" }}
            src={props.image}
            alt={props.movieName}
          />
          <div class="text-white w-100">{props.movieName}</div>
        </a>
      </div>
    </div>
  );
}

export default GridCards;
