import React from "react";
import SubmitComponent from "./SubmitComponent";
import MessageComponent from "./MessageComponent";

function FormComponent(props) {
  const [state, setState] = React.useState({});
  const initialState = props.initialState || {};
  const onChangeCallBack = props.onChangeCallBack || function () {};

  React.useEffect(() => {
    setState({ ...state, ...initialState });
  }, []);

  React.useEffect(() => {
    // M.updateTextFields();

    const textarea = document.querySelector("textarea");
    if (textarea) M.textareaAutoResize(textarea);
  });

  const onChange = ({ target }) => {
    const newState = { ...state, [target.id]: target.checked || target.value };
    setState(newState);
    onChangeCallBack(newState);
  };

  const createForm = (formObject) => {
    if (formObject.type === "component") {
      return <div key={formObject.key}>{formObject.component}</div>;
    }

    // text or password -- not required
    if (formObject.required === false) {
      return (
        <div key={formObject.id} className={props.divClass}>
          <div className={`input-field`}>
            <input
              type={formObject.type || "text"}
              id={formObject.id}
              name={formObject.id}
              className="validate"
              value={state[formObject.id] || ""}
              onChange={onChange}
            />
            <label className="active" htmlFor={formObject.id}>
              {formObject.label || formObject.id.replace(/_/g, " ")} (Optional)
            </label>
          </div>
        </div>
      );
    }

    // password -- not required
    if (formObject.type === "password") {
      return (
        <div className={`input-field ${props.divClass}`} key={formObject.id}>
          <input
            type={formObject.type || "text"}
            id={formObject.id}
            name={formObject.id}
            // placeholder={formObject.id.replace(/_/g, " ")}
            value={state[formObject.id] || ""}
            onChange={onChange}
            autoComplete={"new-password"}
            required
          />
          <label className="active" htmlFor={formObject.id}>
            {formObject.label || formObject.id.replace(/_/g, " ")}
          </label>
        </div>
      );
    }

    //  email -- not required
    if (formObject.type === "email") {
      return (
        <div className={`input-field ${props.divClass}`} key={formObject.id}>
          <input
            type={formObject.type || "text"}
            id={formObject.id}
            // placeholder={formObject.id.replace(/_/g, " ")}
            name={formObject.id}
            value={state[formObject.id] || ""}
            onChange={onChange}
            autoComplete={"new-email"}
            required
          />
          <label className="active" htmlFor={formObject.id}>
            {formObject.label || formObject.id.replace(/_/g, " ")}
          </label>
        </div>
      );
    }

    // textarea
    if (formObject.type === "textarea") {
      return (
        <div className="input-field" key={formObject.id}>
          <textarea
            id={formObject.id}
            name={formObject.id}
            onChange={onChange}
            className="materialize-textarea"
            value={state[formObject.id] || ""}
            style={{ height: "250px" }}
          />
          <label htmlFor={formObject.id} className="active">
            {formObject.label || formObject.id.replace(/_/g, " ")}
          </label>
        </div>
      );
    }

    // select
    if (formObject.type === "select") {
      const selected = initialState[formObject.id];

      const options = formObject.options.map((option) => {
        return (
          <option key={option.key || option.value} value={option.value}>
            {option.label || option.value}
          </option>
        );
      });

      return (
        <div className={`input-field ${props.divClass}`} key={formObject.id}>
          <label className="active">
            {formObject.label || formObject.id.replace(/_/g, " ")}
          </label>
          <select
            id={formObject.id}
            onChange={onChange}
            className={`browser-default ${formObject.className}`}
            defaultValue={selected}
          >
            {options}
          </select>
          {formObject.comment ? (
            <center style={{ fontSize: "13px" }}>{formObject.comment}</center>
          ) : (
            <React.Fragment />
          )}
          {formObject.padded ? <br /> : <React.Fragment />}
        </div>
      );
    }

    // number
    if (formObject.type === "number") {
      return (
        <div key={formObject.id} className={props.divClass}>
          <div className={`input-field`}>
            {formObject.prefix && (
              <span className=" prefix">{formObject.prefix || ""}</span>
            )}
            <label className="active" htmlFor={formObject.id}>
              {formObject.label || formObject.id.replace(/_/g, " ")}
            </label>
            <input
              type={"number"}
              id={formObject.id}
              min={formObject.min || ""}
              max={formObject.max || ""}
              step="any"
              // placeholder={
              //   formObject.placeholder || formObject.id.replace(/_/g, " ")
              // }
              name={formObject.id}
              className={formObject.className || ""}
              defaultValue={state[formObject.id]}
              onChange={onChange}
              required
            />
          </div>
        </div>
      );
    }

    if (formObject.placeholder) {
      return (
        <div key={formObject.id}>
          <div className={`input-field ${props.divClass}`}>
            <input
              placeholder={formObject.placeholder}
              type={formObject.type ?? "text"}
              id={formObject.id}
              name={formObject.id}
              className={formObject.className}
              maxLength={formObject.maxLength || 300}
              value={state[formObject.id] || ""}
              inputMode={formObject.inputMode || "text"}
              onChange={onChange}
              required
            />
            {!formObject.removeLabel && (
              <label className="active" htmlFor={formObject.id}>
                {formObject.label || formObject.id.replace(/_/g, " ")}
              </label>
            )}
          </div>
        </div>
      );
    }

    // text
    if (
      formObject.type === "text" ||
      formObject.type === undefined ||
      formObject.type === "date" ||
      formObject.type === "tel"
    ) {
      return (
        <div key={formObject.id}>
          <div className={`input-field ${props.divClass}`}>
            <input
              // placeholder={formObject.placeholder ?? ""}
              type={formObject.type ?? "text"}
              id={formObject.id}
              name={formObject.id}
              className={formObject.className}
              maxLength={formObject.maxLength || 300}
              value={state[formObject.id] || ""}
              inputMode={formObject.inputMode || "text"}
              onChange={onChange}
              required
            />
            {!formObject.removeLabel && (
              <label className="active" htmlFor={formObject.id}>
                {formObject.label || formObject.id.replace(/_/g, " ")}
              </label>
            )}
          </div>
        </div>
      );
    }

    // check box
    if (formObject.type === "checkbox") {
      // const link = formObject.link || "";
      // const title = formObject.title || "";
      return (
        <p key={formObject.id}>
          <label>
            <input
              id={formObject.id}
              type="checkbox"
              defaultChecked={formObject.checked || false}
              onChange={onChange}
              name={formObject.id}
            />
            <span>
              {formObject.label || formObject.id}
              {/* <a href={link}>{title}</a> */}
            </span>
          </label>
        </p>
      );
    }
  };

  const renderSubmit = () => {
    if (!hideSubmitButton) {
      return (
        <React.Fragment>
          <SubmitComponent
            text={props.text || "Submit"}
            fetching={props.fetching || false}
            className={props.className}
          />
        </React.Fragment>
      );
    }
  };

  const formArray = props.formArray || [];
  const elements = formArray.map(createForm);

  const onSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(state);
  };

  const hideSubmitButton = props.hideSubmitButton || false;

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <div className="row">{elements}</div>

      {renderSubmit()}

      <MessageComponent
        errors={props.errors || []}
        message={props.message || ""}
      />
    </form>
  );
}

export default FormComponent;
