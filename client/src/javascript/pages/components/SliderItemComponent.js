import React from "react";

function SliderItemComponent({ children }) {
  return (
    <div className="carousel-item">
      <div className="animated fadeInRight slow">
        <div className="container app-py-3">{children}</div>
      </div>
    </div>
  );
}

export default SliderItemComponent;
