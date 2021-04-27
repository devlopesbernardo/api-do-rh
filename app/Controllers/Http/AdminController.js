"use strict";

const User = use("App/Models/User");
const Plan = use("App/Models/Plan");
var uuid = require("uuid-random");

const Database = use("Database");
const Drive = use("Drive");

class AdminController {
  async forwardAnswer({ request, response }) {
    const { plan_id, comment } = await request.all();
    const uid = uuid();

    const file = await request.file("file", {
      types: ["pdf"],
      size: "15mb",
    });

    const name = file.clientName;
    const ext = file.extname;

    const fileName = `${name}-${uid}.${ext}`;

    const url = await Drive.disk("minio").put(file.tmpPath, fileName);

    try {
      const edit = await Plan.query().where("id", plan_id).update({
        reviewed: true,
        user_feedback_file: url,
        user_feedback: comment.toString(),
      });
      return edit;
    } catch (e) {
      console.log(e);
    }

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
