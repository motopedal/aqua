import React from "react";
import OrderTotalByTime from './Orders/OrderTotalByTime'
import OrderByTime from './Orders/OrderByTime'
import Overall from "./Orders/Overall";

export default function OrderCharts({ data }) {
  return (
    <div style={{display:"flex", flexDirection:"column", gap:"3rem"}}>
      <OrderTotalByTime data={data} />
      <OrderByTime data={data} />
      <Overall data={data} />
    </div>
  );
}
