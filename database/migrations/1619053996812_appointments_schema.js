"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AppointmentsSchema extends Schema {
  up() {
    this.table("appointments", (table) => {
      table.integer("user_id");
    });
  }

  down() {
    this.table("appointments", (table) => {
      // reverse alternations
    });
  }
}

module.exports = AppointmentsSchema;
