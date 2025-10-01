import React from "react";

function SliderComponent({ children }) {
  const sliderRef = React.useRef();

  // prettier-ignore
  React.useLayoutEffect(() => {
    const elems = document.querySelectorAll("#slider1.carousel");

    M.Carousel.init(elems, {fullWidth: true,indicators: true});

    const elem = document.querySelector("#slider1");

    const instance = M.Carousel.getInstance(elem);

    const nextImage = () => {instance.next()};

    const interval = setInterval(nextImage, 9000);

    return () => { instance.destroy(); clearInterval(interval); };
  }, []);

  // prettier-ignore
  return (
    <React.Fragment>
      <section ref={sliderRef} className="app-relative bg ">
        <div id="slider1" className="carousel top carousel-slider">
          {children}
        </div>
      </section>
    </React.Fragment>
  );
}

export default SliderComponent;
