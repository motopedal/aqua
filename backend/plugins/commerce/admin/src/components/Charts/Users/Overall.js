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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <h1>
        <b>Users overall</b>
      </h1>
      <table>
        <tr>
          <td
            style={{ border: "0.2px solid rgba(0,0,0,0.3)", padding: "0.6rem" }}
          >
            Users:
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
            Bounce rate:
          </td>
          <td
            style={{ border: "0.2px solid rgba(0,0,0,0.3)", padding: "0.6rem" }}
          >
            {(bounceRate / data.length) * 100}%
          </td>
        </tr>
        <tr>
          <td
            style={{ border: "0.2px solid rgba(0,0,0,0.3)", padding: "0.6rem" }}
          >
            Abandon cart rate:
          </td>
          <td
            style={{ border: "0.2px solid rgba(0,0,0,0.3)", padding: "0.6rem" }}
          >
            {(abandonedCart / data.length) * 100}%
          </td>
        </tr>
        <tr>
          <td
            style={{ border: "0.2px solid rgba(0,0,0,0.3)", padding: "0.6rem" }}
          >
            Checkouts:
          </td>
          <td
            style={{ border: "0.2px solid rgba(0,0,0,0.3)", padding: "0.6rem" }}
          >
            {checkout}
          </td>
        </tr>
        <tr>
          <td
            style={{ border: "0.2px solid rgba(0,0,0,0.3)", padding: "0.6rem" }}
          >
            Checkouts rate:
          </td>
          <td
            style={{ border: "0.2px solid rgba(0,0,0,0.3)", padding: "0.6rem" }}
          >
            {(checkout / data.length) * 100}%
          </td>
        </tr>
      </table>
    </div>
  );
}
