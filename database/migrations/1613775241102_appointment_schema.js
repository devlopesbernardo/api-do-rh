"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AppointmentSchema extends Schema {
  up() {
    this.create("appointments", (table) => {
      table.increments();
      table.string("user_id").notNullable();
      table.string("title").notNullable();
      table.datetime("hour").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("appointments");
  }
}

module.exports = AppointmentSchema;
