"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PlanSchema extends Schema {
  up() {
    this.create("plans", (table) => {
      table.increments();
      table.integer("user_id").notNullable();
      table.string("plan_name").notNullable();
      table.integer("plan_id").notNullable();
      table.string("plan_status").notNullable();
      table.json("links").notNullable();
      table.string("user_comments").notNullable();
      table.string("user_feedback").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("plans");
  }
}

module.exports = PlanSchema;
