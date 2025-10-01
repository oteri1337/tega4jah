import React from "react";
import Form from "components/FormComponent";
import { sendRequestThenDispatch } from "hooks";
import TableComponent from "components/TableComponent";
import ContainerComponent from "components/AdminContainerComponent";

function OrdersUpdatePage({ history, location, match }) {
  const mapRef = React.useRef();

  const { id } = match.params;

  const { request, callBack, state } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;

  const data = state.orders.data.find((w) => w.id == id) || location.props;

  if (!data) {
    return (
      <ContainerComponent bread={[]}>
        <div className="card-panel">
          <p>Not Found</p>
        </div>
      </ContainerComponent>
    );
  }

  React.useEffect(() => {
    if (mapRef.current) {
      const lat = data.current_latitude;
      const lng = data.current_longitude;

      const map = new google.maps.Map(mapRef.current, {
        mapId: "control",
        zoom: 17,
        center: { lat, lng },
      });

      new google.maps.marker.AdvancedMarkerElement({
        position: {
          lat,
          lng,
        },
        map,
      });
    }
  }, [data]);

  const nav = [
    {
      label: "Orders",
      link: "/cp/orders",
    },
    {
      label: `#${data.id} ${data.total}`,
    },
  ];

  const formArray = [
    {
      id: "delivery_status",
      type: "select",
      options: [
        {
          value: "Pending",
        },
        {
          value: "Delivered",
        },
      ],
    },
  ];

  const { items, ...order } = data;

  const initialState = {
    ...order,
  };

  const onSuccess = () => {
    history.goBack();
  };

  const onSubmit = async (body) => {
    callBack("/api/orders", "", body, onSuccess, "PATCH");
  };

  return (
    <ContainerComponent bread={nav} title={data.expires_at}>
      <div className="row">
        <div className="col l4 s12">
          <div className="card-panel">
            <Form
              {...{
                formArray,
                fetching,
                errors,
                message,
                initialState,
                onSubmit,
              }}
            />
          </div>

          <br />
          <br />
          <div ref={mapRef} style={{ height: "60vh" }}></div>
        </div>
        <div className="col l7 offset-l1 s12">
          <div className="card-panel">
            <TableComponent data={order} />
          </div>
        </div>
      </div>
    </ContainerComponent>
  );
}

export default OrdersUpdatePage;
