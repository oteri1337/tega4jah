import React from "react";
import { CSSTransition } from "react-transition-group";

function FadeInComponent(props) {
  const nodeRef = React.useRef(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      classNames="fade"
      in={true}
      appear={true}
      timeout={300}
    >
      <section ref={nodeRef}>{props.children}</section>
    </CSSTransition>
  );
}

export default FadeInComponent;
