import React from "react";

function FormTemplateComponent({ formObjects = [], initialState = {} }) {
  return formObjects.map((f) => {
    if (f.type == "email") {
      return (
        <div key={f.id} className="input-field">
          <i className="material-symbols-outlined prefix">email</i>
          <label className="active" htmlFor={f.id}>
            {f.label || f.id.replace(/_/g, " ")}
          </label>
          <input
            ref={f.ref}
            id={f.id}
            name={f.id}
            required
            type={f.type || "text"}
            defaultValue={initialState[f.id] ?? ""}
          />
        </div>
      );
    }

    if (f.type == "password") {
      const [type, setType] = React.useState("password");
      const [icon, setIcon] = React.useState("toggle_on");

      const onClick = () => {
        if (type == "password") {
          setType("text");
          setIcon("toggle_on");
        } else {
          setType("password");
          setIcon("toggle_off");
        }
      };

      return (
        <div key={f.id} className="input-field">
          <i onClick={onClick} className="material-symbols-outlined prefix">
            {icon}
          </i>
          <label className="active" htmlFor={f.id}>
            {f.label || f.id.replace(/_/g, " ")}
          </label>
          <input
            ref={f.ref}
            id={f.id}
            name={f.id}
            required
            type={type}
            defaultValue={initialState[f.id] ?? ""}
          />
        </div>
      );
    }

    if (f.type == undefined) {
      return (
        <div key={f.id} className="input-field">
          <label htmlFor={f.id}>{f.label || f.id.replace(/_/g, " ")}</label>
          <input
            ref={f.ref}
            id={f.id}
            name={f.id}
            required
            // placeholder={f.id}
            type={f.type || "text"}
          />
        </div>
      );
    }

    // if (f.type == "text") {
    //   return <p>{f.text}</p>;
    // }

    if (f.type == "checkbox") {
      return (
        <p>
          <label>
            <input type="checkbox" id={f.id} name={f.id} ref={f.ref} />
            <span>{f.label || f.id.replace(/_/g, " ")}</span>
          </label>
        </p>
      );
    }

    if (f.type == "number") {
      return (
        <div key={f.id}>
          <label>{f.label || f.id.replace(/_/g, " ")}</label>
          <input
            key={f.id}
            type="number"
            // placeholder={f.id}
            ref={f.ref}
            id={f.id}
            name={f.id}
            defaultValue={f.defaultValue || ""}
            min={f.min || ""}
            max={f.max || ""}
            required
          />
        </div>
      );
    }

    if (f.type == "file") {
      return (
        <div key={f.id}>
          <div className="file-field input-field">
            <div className="btn btn-secondary">
              <span>{f.label || `select ${f.id}`}</span>
              <input
                type="file"
                accept=".jpg,.png,.jpeg"
                ref={f.ref}
                id={f.id}
                name={f.id}
                required
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </div>
      );
    }

    if (f.type == "textarea") {
      return (
        <div className="input-field" key={f.id}>
          <label>{f.label || f.id.replace(/_/g, " ")}</label>
          <textarea
            type={f.type}
            ref={f.ref}
            id={f.id}
            name={f.id}
            className="materialize-textarea"
            required
          />
        </div>
      );
    }

    if (f.type == "select") {
      const options = f.options || [];
      return (
        <div key={f.id} className="input-field">
          <label className="active">{f.label || f.id.replace(/_/g, " ")}</label>
          <select
            id={f.id}
            name={f.id}
            className="browser-default"
            onChange={(e) => (f.value = e.target.value)}
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label || o.value}
              </option>
            ))}
            ;
          </select>
        </div>
      );
    }
  });
}

export default FormTemplateComponent;
