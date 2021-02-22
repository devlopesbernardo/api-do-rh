"use strict";
const User = use("App/Models/User");
const Appointment = use("App/Models/Appointment");
const moment = require("moment");

class AppointmentController {
  async store({ request, response, auth }) {
    const { id } = await auth.getUser();

    const { hour, title } = request.all();

    const createAppointment = async () =>
      await Appointment.create({
        title,
        user_id: id,
        hour: new Date(hour),
      });

    try {
      await createAppointment();
    } catch (e) {
      response.status(401).send(e.message);
    }
  }
}

module.exports = AppointmentController;
