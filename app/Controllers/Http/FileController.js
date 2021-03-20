"use strict";
const Drive = use("Drive");
const Database = use("Database");
var uuid = require("uuid-random");
const File = use("App/Models/File");
const User = use("App/Models/User");

class FileController {
  async attachToPlan({ request, response, auth }) {
    //id = plan_id
    const { id } = request.all();
    const uid = uuid();

    const file = await request.file("file", {
      types: ["pdf"],
      size: "15mb",
    });

    const name = file.clientName;
    const ext = file.extname;

    const fileName = `${name}-${uid}.${ext}`;

    const url = await Drive.disk("minio").put(file.tmpPath, fileName);

    var create = await File.create({
      plan_id: id,
      user_url: url,
      feedback_url: "",
    });
  }

  async editCurriculum({ request, response, params, auth }) {
    const file_id = params.file_id;
    const { plan_id, url } = request.all();

    try {
      await Database.table("files").where("id", "2").update({ user_url: url });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = FileController;
