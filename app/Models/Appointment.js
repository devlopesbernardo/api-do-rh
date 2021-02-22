"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const moment = require("moment");

class Appointment extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", async (appointmentInstance) => {
      const delegateError = () => {
        throw new Error("Neste horário, já existem marcações");
      };
      var startLimit;
      var endLimit;

      var appointmentList = await Appointment.query().fetch();

      appointmentList.toJSON().map((appointment) => {
        const picked = new Date(appointment.hour);
        const date = moment(picked);

        startLimit = moment(date).subtract(0, "minutes");
        console.log("limite inicial", startLimit);
        endLimit = moment(date).add(59, "minutes");
        console.log("limite finial", endLimit);

        console.log("hora escolhida", moment(appointmentInstance.hour));
        moment(appointmentInstance.hour).isSame(startLimit) ||
        moment(appointmentInstance.hour).isSame(endLimit)
          ? delegateError()
          : null;

        moment(appointmentInstance.hour).isBetween(startLimit, endLimit)
          ? delegateError()
          : null;
      });
    });
  }
  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Appointment;
