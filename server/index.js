const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const logger = require('morgan');
const cookieParser = require('cookie-parser')
const cors = require("cors");

const authRoute = require("./routes/auth");
const cartRoute = require('./routes/cart');
const itemRoute = require('./routes/item');
require('dotenv').config();

const app = express();

//DB Connect 
mongoose.connect(process.env.DB_CONNECT, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    },
    () => {
    console.log("connected to db");
})

//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser()) 
app.use(session({ secret: process.env.SESSION_SECRET, saveUninitialized: false, resave: false }));


// Route Middlewares : 
app.use('/api/user', authRoute);
app.use('/api/cart', cartRoute);
app.use('/api/item', itemRoute);

app.listen(3000, () => console.log('Server up and running'));