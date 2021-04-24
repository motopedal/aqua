"use strict";
module.exports = {
  index: async (ctx) => {
    const users =  await strapi.query("tracker" , "commerce").find()
    const orders =  await strapi.query("order").find()

    ctx.send({
      users,
      orders
    });
  },
};
