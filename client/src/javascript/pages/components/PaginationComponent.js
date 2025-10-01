import React, { Fragment } from "react";
import { DataContext } from "providers/DataProvider";
import { getRequest } from "functions";

const PaginationComponent = function (props) {
  const { callReducer } = React.useContext(DataContext);
  const [fetching, setFetching] = React.useState(false);

  const list = props.list || {};
  const dispatch = props.dispatch || "";

  if (list.current_page === undefined && list.last_page) {
    return <Fragment />;
  }

  const fetchData = async (url) => {
    setFetching(true);
    const { errors, data } = await getRequest(url);

    console.log(data);
    if (errors?.length === 0) {
      callReducer({ dispatch, data });
    }
    setFetching(false);
  };

  const renderFetching = () => {
    if (fetching) {
      return (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      );
    }
  };

  if (list.last_page == 1) {
    return <React.Fragment />;
  }

  const renderNextButton = () => {
    if (!list.next_page_url || fetching) {
      return <Fragment />;
    }

    return (
      <i
        className="material-symbols-outlined  pagination-button"
        onClick={() => fetchData(list.next_page_url)}
      >
        chevron_right
      </i>
    );
  };

  const renderPrevButton = () => {
    if (!list.prev_page_url || fetching) {
      return <Fragment />;
    }

    return (
      <i
        className="material-symbols-outlined  pagination-button"
        onClick={() => fetchData(list.prev_page_url)}
      >
        chevron_left
      </i>
    );
  };

  return (
    <center>
      <div style={{ display: "inline-block" }}>{renderPrevButton()}</div>

      <ul style={{ display: "inline-block" }}>
        <li className="pagination-text">
          ({list.current_page} / {list.last_page})
        </li>
      </ul>

      <div style={{ display: "inline-block" }}>{renderNextButton()}</div>
    </center>
  );
};

export default PaginationComponent;
