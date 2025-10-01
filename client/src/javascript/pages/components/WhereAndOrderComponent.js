import React from "react";
import { useHistory, useLocation } from "react-router-dom";

function WhereAndOrderComponent(props) {
  const history = useHistory();

  const location = useLocation();

  const { data = { order: {}, where: {} } } = props;

  const params = new URLSearchParams(location.search);

  let order = params.get("order") ?? "";
  let where = params.get("where") ?? "";

  if (order.length) {
    order = `&order=${order}`;
  }

  if (where.length) {
    where = `&where=${where}`;
  }

  const onOrder = (p) => {
    history.push(`${history.location.pathname}${p}${where}`);
  };

  const onWhere = (p) => {
    history.push(`${history.location.pathname}${p}${order}`);
  };

  const renderOrderOptions = Object.keys(data.order).map((key) => {
    return (
      <option key={key} value={data.order[key]}>
        {key.toUpperCase()}
      </option>
    );
  });

  const renderWhereOptions = Object.keys(data.where).map((key) => {
    return (
      <option key={key} value={data.where[key]}>
        {key.toUpperCase()}
      </option>
    );
  });

  return (
    <div className="row ">
      <div className="col s6">
        {Object.keys(data.where).length ? (
          <select
            style={{ width: "95%" }}
            className="browser-default"
            defaultValue={where.replace("&", "?")}
            onChange={({ target }) => onWhere(target.value)}
          >
            {renderWhereOptions}
          </select>
        ) : (
          <></>
        )}
      </div>

      <div className="col s6 l6">
        {Object.keys(data.order).length ? (
          <select
            style={{ width: "100%" }}
            className="browser-default"
            defaultValue={order.replace("&", "?")}
            onChange={({ target }) => onOrder(target.value)}
          >
            {renderOrderOptions}
          </select>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default WhereAndOrderComponent;
