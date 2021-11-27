//1. getAllReviews
//2. createReview
//3. getPlanReview
//4. top3review
//5. updateReview
//6. deleteReview

const express = require('express');
const reviewRouter = express.Router();

const { getAllReviews, top3reviews, getPlanReviews, createReview, deleteReview, updateReview } = require('../Controllers/reviewController');
const { protectRoute } = require('../Controllers/authController');

reviewRouter.route('/all')
    .get(getAllReviews)

reviewRouter.route('/top3')
    .get(top3reviews)

reviewRouter.route('/:id')
    .get(getPlanReviews)


//user must be logged in 
//so we are going to use middleware
//that will check user logitivity
reviewRouter.use(protectRoute);
reviewRouter.route('/crud/:plan')
    .post(createReview)

reviewRouter.route('/crud/:id')
    .delete(deleteReview)
    .patch(updateReview)

module.exports = reviewRouter;