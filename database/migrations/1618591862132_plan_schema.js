"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PlanSchema extends Schema {
  up() {
    this.table("plans", (table) => {
      // alter table
    });
  }

  down() {
    this.drop("user_feedback_file");
  }
}

module.exports = PlanSchema;
