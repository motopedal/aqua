const CREATE_ORDER_ITEM = `mutation {
    createOrderItem(input: { data: { Quantity: 2 , Total : 2 , product : "1"} }) {
      orderItem {
        id
      }
    }
  }`;

const CREATE_ORDER = `mutation {
    createOrder(
      input: { data: { Email: "vitya@vitya.com", Total: 3, order_items: 3 } }
    ) {
      order {
        id
      }
    }
  }
`;

export { CREATE_ORDER_ITEM, CREATE_ORDER };
