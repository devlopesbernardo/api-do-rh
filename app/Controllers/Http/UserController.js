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
      "phone",
      "full_name",
    ]);

    const user = await Persona.register(payload);
    return user;
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
}

module.exports = UserController;

/// http://rh.codandosonhos.com:9000/minio/download/my-bucket/oi.pdf?token=
