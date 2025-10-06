import React from "react";

export default ({ colors, setImage }) => {
  return colors?.data?.map((color) => (
    <div
      key={color.id}
      onClick={() => setImage(color.image)}
      style={{
        margin: 5,
        width: 40,
        height: 40,
        cursor: "pointer",
        borderRadius: "50%",
        display: "inline-block",
        background: color.color_code,
      }}
    />
  ));
};
