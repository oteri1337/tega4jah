import React from "react";
import { useFetch } from "hooks";
import { getRequest } from "functions";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { DataContext } from "providers/DataProvider";
import ListComponent from "components/ListComponent";
import PaginationComponent from "./PaginationComponent";
import DeleteComponent from "../../components/DeleteComponent";
import WhereAndOrderComponent from "components/WhereAndOrderComponent";
import AdminContainerComponent from "components/AdminContainerComponent";

function Percent({ value }) {
  if (value == null) {
    return <></>;
  }

  let prefix = "";
  let color = "red";

  if (value >= 0) {
    color = "green";
    prefix = "+";
  }

  return (
    <span style={{ color }}>
      {prefix}
      {value}%
    </span>
  );
}

function AssetsListComponent() {
  const history = useHistory();
  const location = useLocation();
  const endpoint = `/api/assets`;
  const dispatch = "UPDATE_ASSETS";
  const [fetching, setFetching] = React.useState(false);
  const { state, callReducer } = React.useContext(DataContext);
  const list = state.assets;

  const onDelete = async (id, symbol) => {
    const confirmed = confirm(`are you sure you want to delete ${symbol}`);

    if (confirmed) {
      const endpoint = `/api/assets${location.search}`;

      const body = { id };

      const method = "DELETE";

      setFetching(true);

      const response = await request({ endpoint, body, method });

      setFetching(false);

      if (response.errors.length === 0) {
        callReducer({ dispatch: "UPDATE_ASSETS", data: response.data });
        // setList(response.data);
      }
    }
  };

  const onSearch = async (search) => {
    const split = search.split("| ");
    const tradingview = split[1];
    history.push(`/cp/assets/${tradingview}`);
  };

  React.useLayoutEffect(() => {
    let elems = document.querySelectorAll(".autocomplete");

    if (window.M) {
      M.Autocomplete.init(elems, {
        data: state.assets.search_keys,
        onAutocomplete: (search) => {
          console.log("auto");
          onSearch(search);
        },
      });
    }
  });

  const nav = [
    {
      label: `Assets`,
    },
  ];

  const { search } = location;

  const params = new URLSearchParams(search);
  const currentFromUrl = params.get("current") ?? "";

  React.useEffect(() => {
    const getData = async (full) => {
      setFetching(true);
      const res = await getRequest(full);
      setFetching(false);
      if (res.errors.length == 0) {
        callReducer({ dispatch: "UPDATE_ASSETS", data: res.data });
      }
    };

    getData(`${endpoint}${location.search}`);
  }, [window.location.href]);

  const searchRef = React.createRef();

  const { request } = useFetch();

  const where_and_order = {
    order: {
      default: ``,
      "gainers 1d": `?order=change1d:desc`,
      "gainers 7d": `?order=change7d:desc`,
      "gainers 30d": `?order=change30d:desc`,

      "losers 1d": `?order=change1d:asc`,
      "losers 7d": `?order=change7d:asc`,
      "losers 30d": `?order=change30d:asc`,
    },
  };

  where_and_order["where"] = {};

  where_and_order["where"][`default`] = `?`;

  where_and_order["where"][`etfs (${list.count_etf})`] = `?&where=type:etf`;

  where_and_order["where"][
    `forex (${list.count_forex})`
  ] = `?&where=type:forex`;

  where_and_order["where"][
    `crypto (${list.count_crypto})`
  ] = `?&where=type:crypto`;

  where_and_order["where"][
    `stocks (${list.count_stocks})`
  ] = `?&where=type:stock`;

  const callback = (props) => {
    const { id } = props;

    const endpoint = `/api/assets${location.search}`;

    return (
      <li key={props.tradingview} className="collection-item app-py-2">
        <div className="row">
          <Link
            to={`/cp/assets/${props.tradingview}`}
            className="grey-text"
            props={props}
          >
            <div className="col l1 m1" style={{ padding: 0 }}>
              <img src={props.icon} style={{ width: "46px", height: "46px" }} />
            </div>
            <div className="col l2 m2">
              #{props.id} {props.name}
              <br />
              <span className="hide-on-small-only">
                {props.tradingview} |{" "}
                {props.type?.replace(/^\w/, (c) => c.toUpperCase())}
              </span>
            </div>

            <div className="col l2 m2" style={{ textAlign: "right" }}>
              {props.price_usd}
            </div>

            <div
              className="col l2 m2 hide-on-small-only"
              style={{ textAlign: "right" }}
            >
              <Percent value={props.change1d} />
            </div>

            <div
              className="col l2 m2 hide-on-small-only"
              style={{ textAlign: "right" }}
            >
              <Percent value={props.change7d} />
            </div>

            <div
              className="col l2 m2 hide-on-small-only"
              style={{ textAlign: "right" }}
            >
              <Percent value={props.change30d} />
            </div>
          </Link>

          <div
            className="col l1 m1 hide-on-small-only"
            style={{ textAlign: "right" }}
          >
            <br />
            <DeleteComponent {...{ endpoint, dispatch, id }} />
          </div>
        </div>
      </li>
    );
  };

  return (
    <AdminContainerComponent bread={nav}>
      <div>
        <WhereAndOrderComponent data={where_and_order} />

        <div className="row">
          <div className="col s6 l10" style={{ padding: 0 }}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                console.log("prev default");
                onSearch(searchRef.current.value);
              }}
            >
              <div className="input-field">
                <input
                  type="text"
                  id="autocomplete-input"
                  className="autocomplete"
                  ref={searchRef}
                  placeholder={"Search"}
                />
              </div>
            </form>
          </div>
          <div className="col s6 l2" style={{ padding: 0 }}>
            <PaginationComponent list={list} dispatch={dispatch} />
          </div>
        </div>

        <ListComponent {...{ list, dispatch, callback, fetching }} />
      </div>
    </AdminContainerComponent>
  );
}

export default AssetsListComponent;
