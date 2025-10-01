import React from "react";
import { Link } from "react-router-dom";

function BreadComponent({ data = [], className = "" }) {
  if (data.length === 0) {
    return <></>;
  }

  const links = data.map((item) => {
    if (item.link) {
      return (
        <span key={item.label}>
          <Link to={item.link}>{item.label}</Link>
          <i
            className="material-symbols-outlined notranslate"
            style={{ top: 8, position: "relative" }}
          >
            chevron_right
          </i>
        </span>
      );
    }

    return (
      <span className="capitalize" key={item.label || data.length}>
        {item.label}
      </span>
    );
  });

  return (
    <React.Fragment>
      <section className={`${className} app-py-1`}>{links}</section>
    </React.Fragment>
  );
}

export default BreadComponent;
