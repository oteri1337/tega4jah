import React from "react";

function ResolutionPage() {
  return (
    <center>
      <br />
      <br />
      Width - {window.innerWidth}
      <br />
      <br />
      Height - {window.innerHeight}
      <br />
      <br />
      Device - {navigator.userAgent}
    </center>
  );
}

export default ResolutionPage;
