import React from "react";
import HeaderComponent from "./AdminHeaderComponent";
import BreadComponent from "components/BreadComponent";
import FadeInComponent from "./FadeInComponent";

function AdminContainerComponent(props) {
  const { bread = [], children, pageTitle = false } = props;

  let title = ``;

  if (bread.length === 1) {
    title = `${bread[0].label}`;
  }

  if (bread.length > 1) {
    title = `${bread[1].label}`;
  }

  React.useEffect(() => {
    document.title = pageTitle || title;
  });

  const renderBread = () => {
    if (bread.length) {
      return <BreadComponent data={bread} />;
    }
  };

  return (
    <React.Fragment>
      <HeaderComponent fetching={props.fetching} />
      <br />
      <main className="container">
        <FadeInComponent>
          <div>
            {renderBread()}
            <br />
            <div>{children}</div>
          </div>
        </FadeInComponent>
      </main>
    </React.Fragment>
  );
}

export default AdminContainerComponent;
