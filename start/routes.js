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
//old-routes

Route.post("/marcar", "AppointmentController.store");

//new-routes
Route.post("/user/register", "UserController.register");
Route.post("/user/login", "UserController.login");

Route.post("/file/envio-curriculo", "FileController.attachToPlan");

Route.post("/plan/analise-curricular", "PlanController.createCurriculum");
Route.get("/plan/listar-curriculos", "PlanController.listCurriculum");
Route.get("/plan/listar-users", "PlanController.listUsersWithPlans");
Route.get("/plan/user/:id", "PlanController.listSingleUserWithPlan");

Route.put("/plan/test/:plan_id", "FileController.editCurriculum");
