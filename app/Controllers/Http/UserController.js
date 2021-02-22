"use strict";
const Persona = use("Persona");
const Drive = use("Drive");
var uuid = require("uuid-random");
const Env = use("Env");
const Minio = require("minio");
const File = use("App/Models/File");

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
    const { email, password } = await request.all();
    const user = await auth.attempt(email, password);

    await response.send(user);
  }
  async verifyEmail({ params, response }) {
    console.log(params.token);
    const user = await Persona.verifyEmail(params.token);

    response.send({ message: "Email verified" });
  }

  async sendPdf({ request, response, auth }) {
    const dir = __dirname;
    const { id } = await auth.getUser();

    //const isExists = await Drive.disk("minio").put("/test1.jpg");
    const file = await request.file("file", {
      types: ["pdf"],
      size: "15mb",
    });

    const name = file.clientName;
    const ext = file.extname;
    const uid = uuid();
    const mail = request.multipart.mail;

    const fileName = `${name}-${uid}-${mail}.${ext}`;
    console.log(fileName);
    const tmpPath = await file.tmpPath;
    console.log(file.tmpPath);

    var filepath = file.tmpPath;
    const url = await Drive.disk("minio").put(file.tmpPath, fileName);
    console.log(url);
    var create = await File.create({
      user_id: id,
      url: url,
      reviewed: false,
      answer: "none",
    });
    //const downloadable = await Drive.disk("minio").put(tmpPath, fileName);
    //console.log(downloadable);
    //const url = await Drive.disk("minio").getSignedUrl(fileName, 3600);
    //return url;
    // response.send(url);
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

/// http://rh.codandosonhos.com:9000/minio/download/my-bucket/oi.pdf?token=
