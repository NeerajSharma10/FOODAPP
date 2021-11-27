const mongoose = require("mongoose");

const db_link =
    "mongodb+srv://PepCoder:U8giYrcNVRhXyvDq@cluster0.bopaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
    .connect(db_link)
    .then(function(db) {
        // console.log(db);
        console.log("dbb connected");
    })
    .catch(function(err) {
        console.log(err);
    });

//Creating a Schema

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: [20, 'Plan Name should not exceed more than 20 characters']
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'Price not Entered']
    },
    ratingsAverage: {
        type: Number
    },
    discount: {
        type: Number,
        validate: [
            function() {
                return this.discount < 100;
            }, 'discount should not exceed 100'
        ]
    },
    no_of_reviews: {
        type: Number,
        default: 0
    }

});

const planModel = mongoose.model('planModel', planSchema);


// (async function createPlan() {
//     let plan = {
//         name: 'Hell Plan',
//         duration: 40,
//         price: 2100,
//         ratingsAverage: 0,
//         discount: 10
//     }
//     let data = await planModel.create(plan);
//     console.log(data);
// })();

module.exports = planModel;