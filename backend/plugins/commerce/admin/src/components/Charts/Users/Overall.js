import React from "react";

export default function Overall({ data }) {
  let bounceRate = 0;
  let abandonedCart = 0;
  let checkout = 0;

  data.forEach((user) => {
    user.bounce && (bounceRate += 1);
    user.status == "cart" && (abandonedCart += 1);
    user.status == "checkout" && (checkout += 1);
  });
  const style = { border: "0.2px solid rgba(0,0,0,0.3)", padding: "0.6rem" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <h1>
        <b>Users overall</b>
      </h1>
      <table>
        <tr>
          <td style={style}>Users:</td>
          <td style={style}>{data.length}</td>
        </tr>
        <tr>
          <td style={style}>Bounce rate:</td>
          <td style={style}>
            {((bounceRate / data.length) * 100).toFixed(2)}%
          </td>
        </tr>
        <tr>
          <td style={style}>Abandon cart rate:</td>
          <td style={style}>
            {((abandonedCart / data.length) * 100).toFixed(2)}%
          </td>
        </tr>
        <tr>
          <td style={style}>Checkouts:</td>
          <td style={style}>{checkout}</td>
        </tr>
        <tr>
          <td style={style}>Checkouts rate:</td>
          <td style={style}>{((checkout / data.length) * 100).toFixed(2)}%</td>
        </tr>
      </table>
    </div>
  );
}
