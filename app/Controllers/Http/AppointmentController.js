"use strict";
const User = use("App/Models/User");
const Appointment = use("App/Models/Appointment");
const moment = require("moment");

class AppointmentController {
  async store({ request, response, auth }) {
    const { plan_id } = request.all();

    const { hour, title, user_id } = request.all();

    const createAppointment = async () =>
      await Appointment.create({
        title,
        plan_id,
        user_id,
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
    console.log("pickedDate: ", pickedDate);
    const momentPicked = moment(pickedDate).add(3, "hours");
    console.log("momentPicked: ", momentPicked);
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
    // console.log(allMeetings);
    console.log(pickedDate);

    const checkDates = allMeetings.map((single) => {
      let existingDate = single.hour.toISOString();
      let momentExisting = moment(single.hour);

      if (momentPicked.format("L") === momentExisting.format("L")) {
        console.log("comparacao abaixo:");
        console.log("moment picked", momentPicked.format("L"));
        console.log("moment existing", momentExisting.format("L"));
        console.log("////////////////////////////////");

        usedHours.push(existingDate.slice(11));
      }
    });

    return workingHoursDay.filter(function (e) {
      console.log(usedHours);
      return !usedHours.includes(e);
    });
  }

  async listAllDays({ request, response }) {
    const days = await Appointment.query().fetch();
    return days;
  }
}

module.exports = AppointmentController;
