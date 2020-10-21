const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const logger = require('morgan');
const authRoute = require("./routes/auth");
const cartRoute = require('./routes/cart')
require('dotenv').config();

const app = express();

//DB Connect 
mongoose.connect(process.env.DB_CONNECT, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    },
    () => {
    console.log("connected to db")
})

//Middlewares
app.use(express.json())
app.use(session({ secret: process.env.SESSION_SECRET, saveUninitialized: false, resave: false }))
app.use(logger('dev'))

// Route Middlewares : 
app.use('/api/user', authRoute);
app.use('/api/cart', cartRoute);

app.listen(3000, () => console.log('Server up and running'));