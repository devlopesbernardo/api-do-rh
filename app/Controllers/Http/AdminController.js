"use strict";

const User = use("App/Models/User");
const Database = use("Database");

class AdminController {
  async forwardAnswer({ request, response }) {
    //configure Mailer
  }
  async fetchDataFromAppointment({ request, response }) {
    const { id, plan_id } = await request.all();

    const user = await User.query()
      .where("id", id)
      .with("plans", (builder) => {
        builder.where("id", plan_id);
      })
      .fetch();

    // const user = await Database.raw(
    //   `select * from (select * from appointments as app full outer join users on app.user_id = users.id where app.user_id = ${id}) as oie`
    // );

    return user;
  }
  g;
  async replyService({ request, response }) {}
}

module.exports = AdminController;
