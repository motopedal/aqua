import React from "react";

export default function Overall({ data }) {
  let orderTotal = 0;

  data.forEach((order) => {
    orderTotal += parseInt(order.total);
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <h1>
        <b>Orders overall</b>
      </h1>
      <table>
        <tr>
          <td
            style={{ border: "0.2px solid rgba(0,0,0,0.3)", padding: "0.6rem" }}
          >
            Orders:
          </td>
          <td
            style={{ border: "0.2px solid rgba(0,0,0,0.3)", padding: "0.6rem" }}
          >
            {data.length}
          </td>
        </tr>
        <tr>
          <td
            style={{ border: "0.2px solid rgba(0,0,0,0.3)", padding: "0.6rem" }}
          >
            All income:
          </td>
          <td
            style={{ border: "0.2px solid rgba(0,0,0,0.3)", padding: "0.6rem" }}
          >
            {orderTotal}
          </td>
        </tr>
        <tr>
          <td
            style={{ border: "0.2px solid rgba(0,0,0,0.3)", padding: "0.6rem" }}
          >
            Average order:
          </td>
          <td
            style={{ border: "0.2px solid rgba(0,0,0,0.3)", padding: "0.6rem" }}
          >
            {orderTotal / data.length}
          </td>
        </tr>
      </table>
    </div>
  );
}
