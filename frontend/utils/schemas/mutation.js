const CREATE_ORDER_ITEM = (data) => `mutation {
    createOrderItem(input: { data: { quantity: ${data.quantity} , total : ${data.total} , product : ${data.product}, variant : ${data.variant}} }) {
      orderItem {
        id
      }
    }
  }`;

const CREATE_ORDER = (data) => `mutation {
    createOrder(
      input: { data: { email: "${data.email}", total: ${data.total}, order_items: [${data.orderItems}] } }
    ) {
      order {
        id
      }
    }
  }
`;

export { CREATE_ORDER_ITEM, CREATE_ORDER };
