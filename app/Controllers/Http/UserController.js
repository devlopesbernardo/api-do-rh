"use strict";
const Persona = use("Persona");
const Drive = use("Drive");
var uuid = require("uuid-random");
const Env = use("Env");
const Minio = require("minio");

class UserController {
  async register({ request, auth, response }) {
    const payload = request.only([
      "email",
      "password",
      "password_confirmation",
      "area",
      "phone",
      "full_name",
    ]);

    const user = await Persona.register(payload);
    await response.send(user);
  }
  async login({ request, auth, response }) {
    const payload = request.only(["uid", "password"]);
    const user = await Persona.verify(payload);

    await auth.login(user);
  }
  async verifyEmail({ params, response }) {
    console.log(params.token);
    const user = await Persona.verifyEmail(params.token);

    response.send({ message: "Email verified" });
  }

  async sendPdf({ request, response }) {
    const dir = __dirname;
    //const isExists = await Drive.disk("minio").put("/test1.jpg");
    const file = await request.file("file", {
      types: ["pdf"],
      size: "15mb",
    });
    const name = file.clientName;
    const ext = file.extname;
    const uid = uuid();
    const mail = await request.multipart.mail;

    const fileName = `${name}-${uid}-${mail}.${ext}`;
    const tmpPath = await file.tmpPath;
    //response.send(tmpPath);
    // const url = await Drive.disk("minio").put(tmpPath, name);
    const downloadable = await Drive.disk("minio").put(tmpPath, fileName);
    const url = await Drive.disk("minio").getSignedUrl(fileName, 3600);
    return url;
    //response.send(file);
    //return isExists;
  }
  async listPdfs({ request, response }) {
    response.implicitEnd = false;

    var totalObjs = [];
    var minioClient = new Minio.Client({
      endPoint: Env.get("MINIO_HOST"),
      port: 9000,
      useSSL: false,
      accessKey: "minio",
      secretKey: "minio123",
    });

    var end = new Promise(function (resolve, reject) {
      var stream = minioClient.listObjects("my-bucket", "", true);
      stream.on("data", async function (obj) {
        totalObjs.push(obj);
      });
      stream.on("error", function (err) {
        console.log(err);
      });
      const finish = stream.on("end", () => {
        resolve("we/'ve finished it");
        console.log(stream.read());
      });
    }).then((res) => {
      response.send(totalObjs);
    });

    //await generateList().then(() => response.send("oi"));
  }
}

module.exports = UserController;
