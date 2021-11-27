const express = require('express');
const planRouter = express.Router();

const { protectRoute, isAuthorised } = require('../Controllers/authController');
const { getAllPlans, getPlan, createPlan, deletePlan, updatePlan, top3Plans } = require('../Controllers/planController');


//all plane leke ayega
planRouter.route('/allPlans')
    .get(getAllPlans)

//own plan -> logged in necessary
planRouter.use(protectRoute);
planRouter.route('/plan/:id')
    .get(getPlan)

//admin and restaurent can only do create, update and delete plans 
planRouter.use(isAuthorised(['admin', 'restaurentowner']));
planRouter
    .route('/createplan')
    .post(createPlan)

planRouter.route('/udPlan/:id')
    .patch(updatePlan)
    .delete(deletePlan)



planRouter.route('/top3')
    .get(top3Plans)

module.exports = planRouter;