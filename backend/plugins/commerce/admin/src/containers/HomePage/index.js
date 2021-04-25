import React, { memo, useState } from "react";
import OrderCharts from "../../components/Charts/OrderCharts";
import UsersCharts from "../../components/Charts/UsersCharts";
import axios from "axios";

const HomePage = () => {
  const [data, setData] = useState();
  if (!data) {
    axios.get("http://localhost:1337/commerce").then(({ data }) => {
      setData(data);
    });
  }
  /*
  Average Session Duration

  Pages Per Session
  */
  if (data) {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "calc(100% / 2)",
            borderRight: "1px solid rgba(0,0,0,10%)",
            padding: "3rem",
          }}
        >
          <h1>
            <b>User stats</b>
          </h1>
          <UsersCharts data={data.users} />
        </div>
        <div style={{ width: "calc(100% / 2)", padding: "3rem" }}>
          <h1>
            <b>Order stats</b>
          </h1>
          <OrderCharts data={data.orders} />
        </div>
      </div>
    );
  }
};

export default memo(HomePage);
