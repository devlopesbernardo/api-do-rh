"use strict";
const User = use("App/Models/User");
const Appointment = use("App/Models/Appointment");
const moment = require("moment");

class AppointmentController {
  async store({ request, response, auth }) {
    const { plan_id } = request.all();

    const { hour, title } = request.all();

    const createAppointment = async () =>
      await Appointment.create({
        title,
        plan_id,
        hour: new Date(hour),
      });

    try {
      await createAppointment();
    } catch (e) {
      response.status(401).send(e.message);
    }
  }
  async listGivenDay({ request, response }) {
    const { hour } = await request.all();
    //supondo que o trabalho sera das 13 as 18 //
    const pickedDate = new Date(hour);
    const momentPicked = moment(pickedDate);

    const workingHoursDay = [
      "13:00:00.000Z",
      "14:00:00.000Z",
      "15:00:00.000Z",
      "16:00:00.000Z",
      "17:00:00.000Z",
      "18:00:00.000Z",
    ];

    let usedHours = [];

    const allMeetingsSerialized = await Appointment.query().fetch();
    const allMeetings = allMeetingsSerialized.toJSON();

    const checkDates = allMeetings.map((single) => {
      let existingDate = single.hour.toISOString();
      let momentExisting = moment(single.hour);

      if (momentPicked.format("L") === momentExisting.format("L")) {
        usedHours.push(existingDate.slice(11));
      }
    });

    return workingHoursDay.filter(function (e) {
      return !usedHours.includes(e);
    });
  }
}

module.exports = AppointmentController;
