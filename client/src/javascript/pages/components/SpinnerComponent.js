import React from "react";

function SpinnerComponent({ fetching }) {
  if (fetching) {
    return (
      <center>
        <div id="fetching" className="preloader-wrapper active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      </center>
    );
  }
  return <React.Fragment />;
}

export default SpinnerComponent;
