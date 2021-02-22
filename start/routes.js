"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("/user/register", "UserController.register");
Route.post("/user/login", "UserController.login");
Route.get("/verify-email/:token", "UserController.verifyEmail");
Route.post("/sendPdf", "UserController.sendPdf");

Route.get("/list-pdfs", "UserController.listPdfs");
Route.post("/marcar", "AppointmentController.store");
