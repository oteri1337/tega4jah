import React from "react";
import SubmitComponent from "./SubmitComponent";
import MessageComponent from "./MessageComponent";
import FormTemplateComponent from "./FormTemplateComponent";

function UncontrolledFormComponent(props) {
  const { formObjects = [], initialState = {}, callback } = props;
  const inputs = formObjects;

  // let formObjects = props.formObjects || [];
  // let initialState = props.initialState || {};
  // const callBack = props.callback || function () {};

  // create refs for each item
  inputs.forEach((input) => {
    input.ref = React.useRef();

    if (input.type == "select") {
      input.value = input.options[0].value;
    }
  });

  // onSubmit
  const onSubmit = (event) => {
    event.preventDefault();

    const formdata = new FormData();

    inputs.forEach((input) => {
      if (input.type == "file") {
        formdata.append(input.id, input.ref.current.files[0]);
      } else if (input.type == "select") {
        formdata.append(input.id, input.value || "");
      } else {
        formdata.append(input.id, input.ref.current.value || "");
      }
    });

    // add initial state if not in formdata
    Object.keys(initialState).forEach((initialKey) => {
      if (!formdata.has(initialKey)) {
        formdata.append(initialKey, initialState[initialKey]);
      }
    });

    callback(formdata);
  };

  // render form
  return (
    <form encType="multipart/form-data" onSubmit={(e) => onSubmit(e)}>
      <FormTemplateComponent
        formObjects={formObjects}
        initialState={initialState}
      />
      <SubmitComponent
        text={props.text || "Submit"}
        fetching={props.fetching || false}
        className={props.className}
      />
      <MessageComponent
        errors={props.errors || []}
        message={props.message || ""}
      />
    </form>
  );
}

export default UncontrolledFormComponent;
