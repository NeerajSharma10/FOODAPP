const express = require('express');
const userRouter = express.Router();


const jwt = require('jsonwebtoken');

const JWT_KEY = 'shjfdjf7273327hjbwejhfbhwfbwef723732bhdjwyuy3733';

const { updateUser, deleteUser, getUser, getAllUser } = require('../Controllers/userController');
const { signUp, login, protectRoute, isAuthorised, resetpassword, forgetpassword, logout } = require('../Controllers/authController');

//user ke options 
userRouter.route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

userRouter.route('/signUp')
    .post(signUp)

userRouter.route('/login')
    .post(login)

userRouter.route('/forgetpassword')
    .post(forgetpassword)

userRouter.route('/resetpassword')
    .post(resetpassword)

userRouter.route('/logout')
    .get(logout)
    //profile page 
userRouter.use(protectRoute); // a middleware which will ensure that the user is valid or logged in then we will show it the profile page 
userRouter.route('/userProfile')
    .get(getUser)


//admin specific function 
userRouter.use(isAuthorised(['admin']));
userRouter.route('/')
    .get(getAllUser)





module.exports = (userRouter);