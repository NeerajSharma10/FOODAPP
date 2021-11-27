const reviewModel = require('../Models/reviewModel');
const planModel = require('../Models/planModel');

module.exports.getAllReviews = async function(req, res) {
    console.log("helll");
    try {
        let data = await reviewModel.find();
        console.log(data);
        if (data) {
            return res.json({
                message: "Reviews retrieved successfully",
                reviews: data
            });
        } else {
            return res.json({
                message: "Couldnot find data"
            });
        }
    } catch (err) {
        return res.json({
            message: "Error5",
            error: err
        });
    }

};

module.exports.top3reviews = async function(req, res) {
    try {
        const reviews = await reviewModel.find().sort({
            rating: -1
        }).limit(3);
        res.json({
            message: 'Top 3 Reviews',
            data: reviews
        })
    } catch {
        res.json({
            message: "error ",
            error: err
        });
    }
}

module.exports.getPlanReviews = async function(req, res) {
    try {
        let planid = req.params.id;
        let reviews = await reviewModel.find();
        if (reviews) {
            reviews = reviews.filter((review) => {
                return review.plan._id == planid;
            })
            res.json({
                message: "Review selected for a particualr plan",
                reviewss: reviews
            })
        } else {
            res.json({
                message: "No review is available"
            })
        }


    } catch (err) {
        res.json({
            message: "Error",
            error: err
        })
    }
}

module.exports.createReview = async function(req, res) {
    let id = req.params.plan;
    let obj = req.body;
    // console.log(obj);
    try {
        let plan = await planModel.findById(id);
        // console.log(plan.ratingsAverage);
        plan.ratingsAverage = ((plan.ratingsAverage * plan.no_of_reviews) + req.body.rating) / (plan.no_of_reviews + 1);
        plan.no_of_reviews = plan.no_of_reviews + 1;
        console.log(plan.no_of_reviews);
        await plan.save();
        // console.log(plan);
        let data = await reviewModel.create(obj);
        // console.log(data);

        if (data) {
            return res.json({
                message: "Review created successfully",
                reviews: data
            });
        } else {
            return res.json({
                message: "Couldnot create data"
            });
        }
    } catch (err) {
        return res.json({
            message: "Erro_r",
            error: err
        });
    }
}

module.exports.deleteReview = async function(req, res) {
    let planid = req.params.id;

    //review id from frontend
    let id = req.body.id;
    try {

        let data = await reviewModel.findById(id);
        // console.log(data.plan.ratingsAverage);
        // console.log(data.plan.no_of_reviews);
        // console.log(data.rating);
        let pp = await planModel.findById(data.plan._id);
        pp.ratingsAverage = ((pp.no_of_reviews * pp.ratingsAverage) - (data.rating)) / (pp.no_of_reviews - 1);
        // console.log(data.plan.ratingsAverage);
        pp.no_of_reviews = pp.no_of_reviews - 1;
        await pp.save();
        let gg = await reviewModel.findByIdAndDelete(id);
        if (data) {
            return res.json({
                message: "Review deleted successfully",
                reviews: data
            });
        } else {
            return res.json({
                message: "Couldnot delete data"
            });
        }
    } catch (err) {
        return res.json({
            message: "Errorbb",
            error: err
        });
    }
}


module.exports.updateReview = async function(req, res) {
    let planid = req.params.id;

    //review id from frontend
    let id = req.body.id;

    try {
        let keys = [];
        let obj = req.body;
        for (let key in obj) {
            if (key == 'id') continue;
            keys.push(key);
        }
        let review = await reviewModel.findById(id);
        // console.log(keys);
        if (review) {
            for (let i = 0; i < keys.length; i++) {
                review[keys[i]] = obj[keys[i]];
            }
            await review.save();

            return res.json({
                message: "Review updated successfully",
                reviews: review
            });
        } else {
            return res.json({
                message: "Review doesnot exist"
            });
        }

    } catch (err) {
        return res.json({
            message: "Error3",
            error: err
        });
    }
}