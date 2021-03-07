"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class File extends Model {
  plan() {
    return this.belongsTo("App/Models/Plan");
  }
}

module.exports = File;
