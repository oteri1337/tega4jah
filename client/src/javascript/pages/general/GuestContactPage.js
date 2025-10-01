import React from "react";
import { useFetch } from "hooks";
import ContainerComponent from "../Container";
import FormComponent from "components/FormComponent";

function ContactPage() {
  const { state, fetching, request, response } = useFetch();
  const { errors, message } = response;
  const settings = state.settings?.data[0];

  const hero = {
    image: `hero5`,
    overlay: "overlay2",
    title: `Contact Us`,
    desc: `We love to listen and we are eagerly waiting to talk to you`,
  };

  let formArray = [
    {
      id: "subject",
    },
    {
      id: "body",
      type: "textarea",
    },
  ];

  const initialState = {
    to: settings.contact_email,
  };

  const onSubmit = async (body) => {
    const method = "POST";
    const endpoint = "/api/contact";
    request({ endpoint, body, method });
  };

  return (
    <ContainerComponent hero={hero}>
      <div className="container">
        <br />
        <br />
        <center>
          {settings?.contact_phone?.length > 0 && (
            <span style={{ padding: "1rem" }}>
              <span className="material-icons notranslate">phone</span>{" "}
              {settings?.contact_phone}
            </span>
          )}

          {settings?.contact_phone_alt?.length > 0 && (
            <span style={{ padding: "1rem" }}>
              <span className="material-icons notranslate">phone</span>{" "}
              {settings?.contact_phone_alt}
            </span>
          )}
        </center>
        <br />

        <div className="container">
          <FormComponent
            {...{
              formArray,
              initialState,
              fetching,
              errors,
              message,
              onSubmit,
            }}
          />
        </div>

        <br />
      </div>
    </ContainerComponent>
  );
}

export default ContactPage;
