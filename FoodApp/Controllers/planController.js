const planModel = require('../Models/planModel');

module.exports.getAllPlans = async function(req, res) {
    try {
        let plans = await planModel.find();
        if (plans) {
            res.json({
                message: "all data retrieved successfully",
                data: plans
            });
        } else {
            res.json({ message: "plans not found" });
        }

    } catch (err) {
        res.json({
            message: "error",
            error: err
        });
    }
}

module.exports.getPlan = async function(req, res) {
    try {
        let id = req.params.id;
        let plan = await planModel.findById(id);
        if (plan) {
            res.json({
                message: "plan retrieved successfully",
                data: plan
            });
        } else {
            res.json({ message: "plan not found" });
        }

    } catch (err) {
        res.json({
            message: "error",
            error: err
        });
    }
}


module.exports.createPlan = async function(req, res) {
    try {
        let planData = req.body;
        console.log("helll");
        let createdPlan = await planModel.create(planData);
        createdPlan.no_of_reviews = createdPlan.no_of_reviews + 1;
        await createdPlan.save();
        console.log("helll");
        res.json({
            message: "plan created successfully",
            data: createdPlan
        })
    } catch (err) {
        res.json({
            message: "error ",
            error: err
        })
    }
}

module.exports.deletePlan = async function(req, res) {
    try {
        let id = req.params.id;
        let deletedPlan = await planModel.findOneAndDelete(id);
        res.json({
            message: "plan deleted successfully",
            data: deletedPlan
        })
    } catch (err) {
        res.json({
            message: "error ",
            error: err
        });
    }
}


module.exports.updatePlan = async function(req, res) {
    try {
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let keys = [];
        for (let key in dataToBeUpdated) {
            keys.push(key);
        }
        let plan = await planModel.findById(id);
        if (plan) {
            // console.log(plan);
            for (let i = 0; i < keys.length; i++) {
                plan[keys[i]] = dataToBeUpdated[keys[i]];
            }
            await plan.save();
            res.json({
                message: "plan updated successfully",
                data: plan
            })
        } else {
            res.json({
                message: "plan not exist",
            })
        }

    } catch (err) {
        res.json({
            message: "errorhell ",
            error: err
        })
    }
}


//get top 3 Plans 


module.exports.top3Plans = async function async(req, res) {
    try {
        const plans = await planModel.find().sort({
            ratingsAverage: -1
        }).limit(3);
        res.json({
            message: 'Top 3 Plans',
            data: plans
        })
    } catch {
        res.json({
            message: "error ",
            error: err
        });
    }
}