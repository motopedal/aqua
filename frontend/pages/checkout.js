import React, { memo } from "react";
import { CheckoutForm } from "../components/CheckoutForm/CheckoutForm";
import Router from "next/router";

export default memo(function Checkout() {
  if (typeof window !== "undefined") {
    if (!JSON.parse(localStorage.getItem("react-use-cart")).items.length > 0) {
      Router.push("/");
      return null
    } else {
      return (
        <div>
          <CheckoutForm />
        </div>
      );
    }
  }
  return null;
});
