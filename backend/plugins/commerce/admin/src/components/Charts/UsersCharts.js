import React from "react";
import Overall from "./Users/Overall";
import TotalUsersByTime from "./Users/TotalUsersByTime";
import UserRatesByTime from "./Users/UserRatesByTime";

export default function UsersCharts({ data }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <TotalUsersByTime data={data} />
      <UserRatesByTime data={data} />
      <Overall data={data} />
    </div>
  );
}
