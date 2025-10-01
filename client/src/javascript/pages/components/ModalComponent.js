import React from "react";

function ModalComponent({ message }) {
  React.useLayoutEffect(() => {
    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {});

    var elem = document.querySelector("#modal1");
    var instance = M.Modal.getInstance(elem);
    instance.open();
  }, []);

  return (
    <div id="modal1" className="modal">
      <div className="modal-content">
        <p className="black-text">{message}</p>
      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">
          Close
        </a>
      </div>
    </div>
  );
}

export default ModalComponent;
