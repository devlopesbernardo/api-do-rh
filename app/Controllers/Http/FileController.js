"use strict";
const Drive = use("Drive");
var uuid = require("uuid-random");
const Env = use("Env");
const Minio = require("minio");
const File = use("App/Models/File");
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
}

module.exports = FileController;
