import React from "react";
import ErrorPage from "./TourErrorPage";
import { getRequestThenDispatch } from "hooks";
import TourContainerComponent from "../Container";

function DynamicPage({ match }) {
  const { slug } = match.params;
  const { state } = getRequestThenDispatch(`/api/pages`, "UPDATE_PAGES");
  const page = state.pages.object[slug] || location.props;

  React.useLayoutEffect(() => {
    scrollTo(0, 0);
  }, [match]);

  if (!page) {
    return <ErrorPage />;
  }

  const hero = {
    image: page.hero,
    title: page.title,
    overlay: page.overlay,
    sub_title: page.sub_title,
  };

  const boldRegex = /\[bold=([a-zA-Z \?]+)]/g;
  const underlineRegex = /\[underline=([a-zA-Z \?]+)]/g;
  const strikethroughRegex = /\[strikethrough=([a-zA-Z \?]+)]/g;
  const imageRegex = /\[image=(https?:\/\/[.a-zA-Z0-9\/_:\?]+)]/g;
  const videoRegex = /\[video=(https?:\/\/[.a-zA-Z0-9\/_:\?]+)]/g;

  let jsxArray = page.content.split("\n").map((item, key) => {
    const bold = boldRegex.exec(item);
    const image = imageRegex.exec(item);
    const video = videoRegex.exec(item);
    const underline = underlineRegex.exec(item);
    const strikethrough = strikethroughRegex.exec(item);

    if (item == "") {
      return <br key={key} />;
    }

    if (bold) {
      return <b key={key}>{bold[1]}</b>;
    }

    if (underline) {
      return <u key={key}>{underline[1]}</u>;
    }

    if (strikethrough) {
      return <s key={key}>{strikethrough[1]}</s>;
    }

    if (image) {
      return (
        <center>
          <img className="responsive-img" key={key} src={image[1]} />
        </center>
      );
    }

    if (video) {
      return (
        <center>
          <video
            key={key}
            src={video[1]}
            controls={true}
            className="responsive-img"
          ></video>
        </center>
      );
    }

    return <div key={key}>{item}</div>;
  });

  return (
    <TourContainerComponent title={page.title} hero={hero}>
      <section className="container app-py-3">
        <div className="card-panel">
          {/* <h1 className="center">{page.title}</h1>
          <br /> */}
          <div className="container">{jsxArray}</div>
        </div>
      </section>
    </TourContainerComponent>
  );
}

export default DynamicPage;
