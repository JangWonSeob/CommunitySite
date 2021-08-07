import React from "react";

function GridCards(props) {
  console.log("props : ", props);
  return (
    <div className="col">
      <div>
        <a href={`/movie/detail/${props.movieId}`}>
          <img src={props.image} alt={props.movieName} />
          <div>{props.movieName}</div>
        </a>
      </div>
    </div>
  );
}

export default GridCards;
