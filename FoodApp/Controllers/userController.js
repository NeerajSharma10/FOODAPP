const jwt = require('jsonwebtoken');

const JWT_KEY = 'shjfdjf7273327hjbwejhfbhwfbwef723732bhdjwyuy3733';

const userModel = require('../Models/userModel');

module.exports.getUser = async function(req, res) {
    try {
        let id = req.id;
        console.log("eeee");
        console.log(id);
        let user = await userModel.findById(id);
        if (user) {
            return res.json(user);
        } else {
            return res.send("User Not found");
        }

    } catch (err) {
        res.json({
            message: "error",
            error: err
        });
    }
}

module.exports.updateUser = async function(req, res) {

    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        let datatobeupdated = req.body;

        if (user) {
            const keys = [];
            for (let key in datatobeupdated) {
                keys.push(key);
            }
            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = datatobeupdated[keys[i]];
            }
            const updatedData = await user.save();
            res.json({
                message: "data updated successfully",
                data: user
            })
        } else {
            res.json("user Not found");
        }
    } catch (err) {
        res.json({
            message: "errror while fetching data or user",
            error: err
        })
    }

}

module.exports.deleteUser = async function(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if (user) {
            res.json({
                message: "data delete successfully"
            })
        } else {
            res.json({
                message: "user not found"
            })
        }
    } catch (err) {
        res.json({
            message: "error found",
            error: err
        })
    }

}

module.exports.getAllUser = async function(req, res) {
    console.log("hell");
    try {
        console.log("hell");
        let users = await userModel.find();
        console.log(users);
        if (users) {
            res.json({
                message: "users retrieved successfuylly",
                data: users
            })
        } else {
            res.json({
                message: "data not found"
            })
        }

    } catch (err) {
        res.json({
            message: "error found",
            error: err
        })
    }

}