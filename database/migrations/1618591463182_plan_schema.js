"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PlanSchema extends Schema {
  up() {
    this.table("plans", (table) => {
      table.string("user_feedback_file");
    });
  }

  down() {
    this.table("plans", (table) => {
      // reverse alternations
    });
  }
}

module.exports = PlanSchema;
