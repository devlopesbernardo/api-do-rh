"use strict";

const Plan = use("App/Models/Plan");
const User = use("App/Models/User");

class PlanController {
  async createCurriculum({ request, response, auth }) {
    try {
      const user = await auth.getUser();
      console.log("oie");
      const { plan_name, plan_id, links, user_comments } = await request.all();

      const create = await Plan.create({
        user_id: user.id,
        plan_name,
        plan_id,
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
}

module.exports = PlanController;
