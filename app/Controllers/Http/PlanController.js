"use strict";

const Plan = use("App/Models/Plan");
const User = use("App/Models/User");
const Database = use("Database");

class PlanController {
  async createCurriculum({ request, response, auth }) {
    try {
      const user = await auth.getUser();
      console.log("oie");
      const {
        plan_name,
        plan_id,
        links,
        user_comments,
        pending,
      } = await request.all();

      const create = await Plan.create({
        user_id: user.id,
        plan_name,
        plan_id,
        pending,
        plan_status: "Em andamento",
        links,
        user_comments,
        user_feedback: "Ainda não existem feedbacks...",
      });

      return create;
    } catch (error) {
      console.log(error);
    }
  }

  async updatePlan({ request, response, auth }) {
    const user = await auth.getUser();
    const { id, links, user_comments, file_name, pending } = request.all();
    if (user) {
      try {
        const plan = await Plan.query().where("id", id).update({
          links: links,
          user_comments: user_comments,
          file_name: file_name,
          pending: pending,
        });

        return plan;
      } catch (e) {
        console.log(e);
      }
    }
  }

  async listUsersWithFiles({ request, response }) {
    const data = await User.query()
      .with(
        "plans"
        //, (builder) => {
        // builder.with("files");
        //}
      )
      .fetch();
    return data;
  }

  async listUsersWithPlans({ request, response }) {
    const data = await User.query()
      .with("plans", (builder) => {
        builder.with("files");
      })
      .fetch();
    return data;
  }

  async listSingleUserWithPlan({ request, response, params }) {
    const id = params.id;
    const data = await User.query()
      .where("id", id)
      .with("plans", (builder) => {
        builder.with("files");
        builder.with("appointments");
      })
      .fetch();
    return data;
  }

  async listPendingPlans({ request, response }) {
    const plans = await Database.raw(
      "select * from (select *, planos.id as idd from (select * from plans where reviewed = false) as planos INNER JOIN users on planos.user_id = users.id) as resultados FULL OUTER JOIN files on resultados.idd = files.plan_id"
    );
    return plans;
  }
}

module.exports = PlanController;
