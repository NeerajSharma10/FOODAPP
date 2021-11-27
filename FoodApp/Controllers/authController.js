const userModel = require('../Models/userModel')

const jwt = require('jsonwebtoken');

const JWT_KEY = 'shjfdjf7273327hjbwejhfbhwfbwef723732bhdjwyuy3733';

// sign Up user

const { sendMail } = require('./nodemailer');

module.exports.signUp = async function(req, res) {
    try {
        let data = req.body;
        let user = await userModel.create(data);
        sendMail("signup", user);
        if (user) {
            res.json({
                message: "user created successfully",
                user: user
            })

        } else {
            res.json({
                message: "error while signning up"
            })
        }
    } catch (err) {
        res.json({
            message: "Status 500 ",
            error: err
        })
    }
}

//login user

module.exports.login = async function(req, res) {
    try {
        let data = await userModel.findOne({ email: req.body.email });
        console.log(data);
        if (data) {
            if (data.password == req.body.password) {
                let uniqueid = data._id; // data['_id']
                let token = jwt.sign({ payload: uniqueid }, JWT_KEY);
                res.cookie('isLoggedIn', token);
                res.json({
                    message: "user has successfully loo=gged in "
                })
            } else {
                res.json({
                    message: "Wrong Credentials"
                })
            }

        } else {
            res.json({
                message: "User Is not present"
            })
        }

    } catch (err) {
        res.json({
            message: "Status 500 ",
            error: err
        })
    }

}


//isAuthorized function -> to check the users role -> ['user','admin','restaurentowner','deliverboy']

module.exports.isAuthorised = function(roles) {
    return function(req, res, next) {
        console.log(req.role);
        if (roles.includes(req.role) == true) {
            next();
        } else {
            res.json({
                message: "Operation not allowed ",
                status: '401'
            })
        }
    }
}


module.exports.protectRoute = async function(req, res, next) {
    // console.log(req.cookies.isLoggedIn);
    try {
        let token;
        console.log("hell");
        if (req.cookies.isLoggedIn) {

            token = req.cookies.isLoggedIn;
            let payload = jwt.verify(token, JWT_KEY);
            console.log(payload.payload);
            if (payload) {
                console.log(typeof(payload));
                const user = await userModel.findById(payload.payload);
                console.log(user._id);
                req.role = user.role;
                req.id = user._id;
                next();
            } else {
                res.json({
                    message: "user not verified "
                });
            }
        } else {

            res.json({
                message: "please login again"
            });

        }
    } catch (err) {
        res.json({
            message: "Error1",
            error: err
        });
    }
}

//forget password
module.exports.forgetpassword = async function(req, res) {
    let user_email = req.body;
    // console.log(user_email);
    try {
        const user = await userModel.findOne({ email: user_email.email });
        // console.log(user);
        if (user) {
            const resetToken = await user.createResetToken();
            // console.log(resetToken);
            //http://abc.com/resetpassword/:token
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetPassword/`;
            //send email to the user 
            //nodemailer
            let obj = {
                resetPasswordLink: resetPasswordLink,
                email: user_email.email
            }
            sendMail('resetpassword', obj);
            res.json({
                message: "Email is sent"
            })
        } else {
            res.json({
                message: "please signup"
            })
        }

    } catch (err) {
        res.json({
            message: "error",
            error: err
        })
    }
}

module.exports.resetpassword = async function(req, res) {
    try {
        const token = req.params.token;
        // console.log("hell");
        let data = req.body;
        // console.log(data);
        const user = await userModel.findOne(token);
        if (user) {
            //resetPasswordHandler
            user.resetPasswordHandler(data.password, data.confirmpassword);
            await user.save();
            res.json({
                message: "ResetPassword Successfully"
            })
        } else {
            res.json({
                message: "Please Login Again"
            })
        }

    } catch (err) {
        res.json({
            message: "error",
            error: err
        })
    }

}

module.exports.logout = function(req, res) {

    res.cookie('isLoggedIn', ' ', { maxAge: 1 });
    res.json({
        message: "user logged out successfully"
    });
}