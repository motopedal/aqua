module.exports = {
  trackerCreate: async (ctx) => {
    const datetime = new Date();
    await strapi.query("tracker", "commerce").create({
      user_id: ctx.request.body.user_id,
      date: datetime.toISOString().slice(0, 10),
    });
    ctx.send({
      message: "ok",
    });
  },
  trackerUpdate: async (ctx) => {
    const data = {};
    if (ctx.request.body.status) {
      data.status = ctx.request.body.status;
    }
    if (ctx.request.body.u_b) {
      data.bounce = ctx.request.body.u_b;
    }
    await strapi.query("tracker", "commerce").update(
      {
        user_id: ctx.request.body.user_id,
      },
      data
    );
    ctx.send({
      message: "ok",
    });
  },
};
