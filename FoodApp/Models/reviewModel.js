const mongoose = require("mongoose");

const db_link =
    "mongodb+srv://PepCoder:U8giYrcNVRhXyvDq@cluster0.bopaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
    .connect(db_link)
    .then(function(db) {
        // console.log(db);
        console.log("review dbb connected");
    })
    .catch(function(err) {
        console.log(err);
    });

//Creating a Schema

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review is required']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'rating is required']
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
        requied: [true, 'review must belong to a user']
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        ref: 'planModel',
        requied: [true, 'review must belong to a plan']
    }
});

//We will use pre hook

reviewSchema.pre(/^find/, function(next) {

    this.populate({
        path: 'user',
        select: "name profileImage"
    }).populate("plan");
    next();
});



const reviewModel = mongoose.model('reviewModel', reviewSchema);

module.exports = reviewModel;