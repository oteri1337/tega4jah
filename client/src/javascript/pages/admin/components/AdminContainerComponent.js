import React from "react";
import HeaderComponent from "./AdminHeaderComponent";
import BreadComponent from "components/BreadComponent";
import FadeInComponent from "components/FadeInComponent";

function AdminContainerComponent(props) {
  const { bread = [], children, title, className = "container" } = props;

  React.useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeaderComponent />
      <main>
        <FadeInComponent>
          <div className="container">
            <BreadComponent title={title} data={bread} />
          </div>

          <div className={className}>{children}</div>
        </FadeInComponent>
      </main>
    </>
  );
}

export default AdminContainerComponent;
