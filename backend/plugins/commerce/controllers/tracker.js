module.exports = {
  trackerCreate: async (ctx) => {
    const datetime = new Date();
    await strapi.query("tracker", "commerce").create({
      user_id: ctx.request.body.user_id,
      date: datetime.toISOString().slice(0,10)
    });
    ctx.send({
      message: "ok",
    });
  },
  trackerUpdate: async (ctx) => {
    await strapi.query("tracker", "commerce").update(
      {
        user_id: ctx.request.body.user_id,
      },
      {
        status: ctx.request.body.status,
      }
    );
    ctx.send({
      message: "ok",
    });
  },
};
