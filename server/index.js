// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
// Routes
const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/category");
const cartRoute = require("./routes/cart");
const itemRoute = require("./routes/item");
const productRoute = require("./routes/product");
require("dotenv").config();

const app = express();

//DB Connect
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log("connected to db");
  }
);

//Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

// Route Middlewares :
app.use("/api/user", authRoute);
app.use("/api", categoryRoute);
app.use("/api/cart", cartRoute);
app.use("/api/item", itemRoute);
app.use("/api/product", productRoute);

app.listen(3080, () => console.log("Server up and running"));
