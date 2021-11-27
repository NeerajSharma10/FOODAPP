const express = require('express');
const app = express();
const cookie_parser = require('cookie-parser')
app.use(express.json());

app.use(cookie_parser());

app.listen(1000);

const userRouter = require('./Routers/userRouter.js');
const planRouter = require('./Routers/planRouter.js');
const reviewRouter = require('./Routers/reviewRouter.js');
const bookingRouter = require('./Routers/bookingRouter')

app.use('/user', userRouter);
app.use('/plans', planRouter);
app.use('/reviews', reviewRouter);
app.use('/booking', bookingRouter);