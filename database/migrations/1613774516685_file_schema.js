"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FileSchema extends Schema {
  up() {
    this.create("files", (table) => {
      table.increments();
      table.integer("plan_id").notNullable();
      table.string("user_url").notNullable();
      table.string("feedback_url").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("files");
  }
}

module.exports = FileSchema;
