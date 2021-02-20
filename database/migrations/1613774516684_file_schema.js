"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FileSchema extends Schema {
  up() {
    this.create("files", (table) => {
      table.increments();
      table.string("user_id").notNullable();
      table.string("url").notNullable();
      table.boolean("reviewed").notNullable();
      table.string("answer").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("files");
  }
}

module.exports = FileSchema;
