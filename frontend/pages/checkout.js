import React, { memo } from "react";
import { useCart } from "react-use-cart";
import { fetcherGRAPHQL } from "../utils/fetcher";
import { CREATE_ORDER, CREATE_ORDER_ITEM } from "../utils/schemas/mutation";

export default memo(function checkout() {
  const { items, cartTotal } = useCart();

  const handleOrder = () => {
    let state = [];
    items.forEach(async ({ quantity, itemTotal, product, variant }) => {
      const orderItemData = { quantity, total: itemTotal, product, variant };
      await fetcherGRAPHQL(CREATE_ORDER_ITEM(orderItemData)).then(
        ({ createOrderItem }) => {
          state.push(createOrderItem.orderItem.id);
        }
      );
      if (state.length == items.length) {
        const orderData = {
          email: "vitya@aa.com",
          total: cartTotal,
          orderItems: state,
        };
        fetcherGRAPHQL(CREATE_ORDER(orderData));
      }
    });
  };

  return (
    <div>
      <button onClick={() => handleOrder()}>order</button>
    </div>
  );
});
