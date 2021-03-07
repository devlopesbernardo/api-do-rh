"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Plan extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }
  files() {
    return this.hasMany("App/Models/File");
  }
  appointments() {
    return this.hasMany("App/Models/Appointment");
  }
}

module.exports = Plan;
