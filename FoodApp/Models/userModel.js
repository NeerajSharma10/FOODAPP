const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//Connection
const crypto = require("crypto");
const db_link =
    "mongodb+srv://PepCoder:U8giYrcNVRhXyvDq@cluster0.bopaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
    .connect(db_link)
    .then(function(db) {
        // console.log(db);
        console.log("user dbb connected");
    })
    .catch(function(err) {
        console.log(err);
    });

//Creating a Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 4,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'restaurentowner', 'deliveryboy'],
        deafult: 'user'
    },
    profileImage: {
        type: String,
        default: 'img/users/default.jpeg' // it will be present in public folder
    },
    resetToken: String
});

// console.log("heee");

//Model

userSchema.methods.createResetToken = function() {
    console.log("sjfhgsdfhhfhdfehferferfeferfe");
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetToken = resetToken;
    return resetToken;
}
userSchema.methods.resetPasswordHandler = function(password, confirmpassword) {
    this.password = password;
    this.confirmPassword = confirmpassword;
    this.resetToken = undefined;
}
userSchema.methods.hell = function() {
    console.log("print");
}




const userModel = mongoose.model("userModel", userSchema);









// (async function createUser(){
//     let user = {
//         name : 'Gagadfdsfsfcxdfgfdbdsn Malviye',
//         email : 'dspsdfd@gmail.com',
//         password : '12345',
//         confirmPassword : '12345'
//     }

//     userSchema.pre('save',function(){
//         console.log("before save in db ",this);
//     });

//     let data = await userModel.create(user);
//     console.log(data);
// })();

// (async function hell(){
//     console.log("hell1");
//     let obj = await userModel.updateOne({name : 'Abhinav'},{name : 'Nishant Singh'});
//     console.log("hell2");
//     console.log(obj);

// })();

// // hell();

// console.log("heee");

// userSchema.pre('save',async function(){

//     const password = this.password;
//     const rounds = 10;
//     bcrypt.hash(password, rounds, (err, hash) => {
//         if (err) {
//         console.error(err)
//         return
//         }
//         console.log(hash)
//     })

// });

// (async function createUser() {
//     let user = {
//         name: "",
//         email: "",
//         password: "1234564",
//         confirmPassword: "1234564",
//     };

//     let data = await userModel.create(user);

// })();

module.exports = userModel;

//U8giYrcNVRhXyvDq