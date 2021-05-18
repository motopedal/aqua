import React from "react";

export default function Overall({ data }) {
  const style = { border: "0.2px solid rgba(0,0,0,0.3)", padding: "0.6rem" };
  let orderTotal = 0;
  const emails = [];

  data.forEach((order) => {
    orderTotal += parseInt(order.total);
    if (!emails.includes(order.email)) {
      emails.push(order.email);
    }
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <h1>
        <b>Orders overall</b>
      </h1>
      <table>
        <tr>
          <td style={style}>Orders:</td>
          <td style={style}>{data.length}</td>
        </tr>
        <tr>
          <td style={style}>All income:</td>
          <td style={style}>{orderTotal}</td>
        </tr>
        <tr>
          <td style={style}>Average order:</td>
          <td style={style}>{orderTotal / data.length}</td>
        </tr>
        <tr>
          <td style={style}>Unique emails:</td>
          <td style={style}>{emails.length}</td>
        </tr>
      </table>
    </div>
  );
}
