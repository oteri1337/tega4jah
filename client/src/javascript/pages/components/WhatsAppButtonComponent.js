import React from "react";
// import { DataContext } from "providers/DataProvider";

function WhatsAppButtonComponent() {
  //   const { state } = React.useContext(DataContext);
  //   const settings = state.settings?.data[0];

  //   if (settings?.show_whatsapp_icon == "no") {
  //     return <></>;
  //   }

  return (
    <div className="fixed-action-btn" style={{ left: "10px" }}>
      <a
        target="_blank"
        href={`https://wa.me/+2348169337785`}
        className="white btn-floating btn-large"
      >
        <img
          src="/assets/images/social/whatsapp.webp"
          style={{ width: "70%", height: "70%", verticalAlign: "middle" }}
        />
      </a>
    </div>
  );
}

export default WhatsAppButtonComponent;
