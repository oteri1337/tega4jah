import React from "react";
import { useHistory } from "react-router-dom";

const PaginationComponent = function (props) {
  const history = useHistory();

  const list = props.list || {};

  if (list.current_page === undefined && list.last_page) {
    return <Fragment />;
  }

  const fetchData = async (next_page_url) => {
    let next = `/cp/assets?${next_page_url.split("?")[1]}`;
    history.push(next);
  };

  if (list.last_page == 1) {
    return <React.Fragment />;
  }

  const renderNextButton = () => {
    if (!list.next_page_url) {
      return <React.Fragment />;
    }

    return (
      <i
        className="material-symbols-outlined"
        onClick={() => fetchData(list.next_page_url)}
      >
        chevron_right
      </i>
    );
  };

  const renderPrevButton = () => {
    if (!list.prev_page_url) {
      return <React.Fragment />;
    }

    return (
      <i
        className="material-symbols-outlined"
        onClick={() => fetchData(list.prev_page_url)}
      >
        chevron_left
      </i>
    );
  };

  return (
    <div className="row" style={{ marginTop: "2rem" }}>
      <div className="col s4 center">{renderPrevButton()}</div>

      <div className="col s4 center">
        ({list.current_page} / {list.last_page})
      </div>

      <div className="col s4 center">{renderNextButton()}</div>
    </div>
  );
};

export default PaginationComponent;
