"use strict";
const Persona = use("Persona");

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

  async grabData({ request, auth, response }) {
    const { token, oi } = await request.all();
    // console.log(request);
    console.log(token);
    try {
      const user = await auth.getUser(token);
      await response.send({
        name: user.full_name,
        id: user.id,
        email: user.email,
      });
    } catch (e) {
      console.log(e);
      response.send(e);
    }
  }

  async verifyEmail({ params, response }) {
    console.log(params.token);
    const user = await Persona.verifyEmail(params.token);

    response.send({ message: "Email verified" });
  }
}

module.exports = UserController;

/// http://rh.codandosonhos.com:9000/minio/download/my-bucket/oi.pdf?token=
