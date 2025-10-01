import React from "react";

const TableComponent = ({ data = {} }) => {
  let keysArray = Object.keys(data);

  const rows = keysArray.map((key) => {
    if (typeof data[key] === "object") {
      return false;
    }

    // console.log(key, data[key].length);

    if (data[key]?.length >= 25) {
      return (
        <tr key={key} className="row ">
          <td
            className="col l5 s12 table-title app-mobile-center"
            style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
          >
            {key.replace(/_/g, " ")}
          </td>
          <td
            className="col l7 s12 table-content app-mobile-center"
            style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
          >
            {data[key]}
          </td>
        </tr>
      );
    }

    if (data[key]?.length >= 17) {
      return (
        <tr key={key} className="row">
          <td
            className="col l5 s4 table-title"
            style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
          >
            {key.replace(/_/g, " ")}
          </td>
          <td
            className="col l7 s8 table-content"
            style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
          >
            {data[key]}
          </td>
        </tr>
      );
    }

    if (key.length == 5) {
      return (
        <tr key={key} className="row">
          <td
            className="col l5 s6 table-title"
            style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
          >
            {key.replace(/_/g, " ")}
          </td>
          <td
            className="col l7 s6 table-content"
            style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
          >
            {data[key]}
          </td>
        </tr>
      );
    }

    // if (key.length >= 14) {
    return (
      <tr key={key} className="row">
        <td
          className="col l5 s7 table-title"
          style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
        >
          {key.replace(/_/g, " ")}
        </td>
        <td
          className="col l7 s5 table-content"
          style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
        >
          {data[key]}
        </td>
      </tr>
    );
  });

  return (
    <table className="striped">
      <tbody>{rows}</tbody>
    </table>
  );
};

export default TableComponent;
