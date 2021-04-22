"use strict";
const Database = use("Database");

class AdminController {
  async forwardAnswer({ request, response }) {
    //configure Mailer
  }
  async fetchDataFromAppointment({ request, response }) {
    const { id } = await request.all();

    const user = await Database.raw(
      `select * from (select * from appointments as app full outer join users on app.user_id = users.id where app.user_id = ${id}) as oie`
    );

    return user;
  }
  async replyService({ request, response }) {}
}

module.exports = AdminController;
