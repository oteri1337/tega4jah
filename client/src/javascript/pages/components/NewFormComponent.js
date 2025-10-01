import React from "react";

function NewFormComponent({ form = [], initialState = {}, fetching = false }) {
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    if (Object.keys(initialState).length) {
      setState({ ...state, ...initialState });
    }
  }, [initialState]);

  const onChange = ({ target }) => {
    const callBack =
      form[target.id].onChange ||
      function () {
        setState({ ...state, [target.id]: target.value });
      };

    callBack(target.value, state, setState);
  };

  if (!Array.isArray(form)) {
    const renderedForm = Object.keys(form).map((key) => {
      if (form[key]?.type == "submit") {
        if (fetching) {
          return (
            <button key={key} className={form[key]?.className}>
              <div
                className="preloader-wrapper small active"
                style={{ height: "20px", width: "20px" }}
              >
                <div className="spinner-layer" style={{ borderColor: "white" }}>
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div>
                  <div className="gap-patch">
                    <div className="circle"></div>
                  </div>
                  <div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
            </button>
          );
        }

        return (
          <button
            key={key}
            onClick={() => {
              form[key].onClick(state);
            }}
            className={form[key]?.className}
          >
            {form[key]?.text}
          </button>
        );
      }

      if (form[key]?.type == "select") {
        // console.log(form[key]);

        // const options = form[key]?.options || [];

        let renderedOptions;

        if (form[key].options.length) {
          renderedOptions = form[key].options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label || option.value}
              </option>
            );
          });
        }

        return (
          <div
            key={key}
            style={{
              marginRight: "1px",
              marginTop: "4px",
              marginBottom: 0,
              display: form[key].display || "inline-block",
            }}
          >
            <select
              id={key}
              onChange={onChange}
              className="browser-default"
              value={initialState[key]}
            >
              {renderedOptions}
            </select>
          </div>
        );
      }

      return (
        <div className="input-field" key={key} style={{ maxWidth: "350px" }}>
          <label htmlFor={form[key].id}>
            {form[key].label || key.replace(/_/g, " ")}
          </label>
          <input
            id={key}
            onChange={onChange}
            type={form[key].type || "text"}
            style={{ textAlign: "center" }}
            value={state[key] || form[key].value || ""}
          />
        </div>
      );
    });

    return renderedForm;
  }

  return form.map((input) => {
    return (
      <input
        id={input.id}
        key={input.id}
        onChange={onChange}
        placeholder={input.id}
        type={input.type || "text"}
        value={state[input.id] || input.value || ""}
      />
    );
  });
}

export default NewFormComponent;
