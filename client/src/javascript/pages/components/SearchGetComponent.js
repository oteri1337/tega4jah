import React from "react";
import { useFetch } from "hooks";

const SearchGetComponent = (props) => {
  const searchRef = React.createRef();
  const { dispatch } = props;
  const { fetching, request } = useFetch();

  const data = props.data || {};

  const onSubmit = async (body) => {
    const endpoint = `${props.endpoint}/${body.search}`;

    request({ endpoint, dispatch });
  };

  React.useLayoutEffect(() => {
    let elems = document.querySelectorAll(".autocomplete");

    let options = { data };

    options.onAutocomplete = function (search) {
      onSubmit({ search });
    };

    if (window.M) {
      M.Autocomplete.init(elems, options);
    }
  });

  const renderFetching = () => {
    if (fetching) {
      return (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit({ search: searchRef.current.value });
        }}
      >
        <div className="input-field">
          <input
            autoComplete="off"
            type="text"
            id="autocomplete-input"
            className="autocomplete"
            ref={searchRef}
            placeholder={props.label || "Search"}
          />
        </div>
      </form>
      {renderFetching()}
    </React.Fragment>
  );
};

export default SearchGetComponent;
