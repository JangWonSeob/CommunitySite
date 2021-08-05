import React from "react";

function GridCards(props) {
  return (
    <div className="col">
      <div>
        <a href="">
          <img src={props.image} alt="" />
        </a>
      </div>
    </div>
  );
}

export default GridCards;
