// Dependencies
const express = require("express")
const session = require("express-session")
const logger = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors")
// Routes
const authRoute = require("./routes/auth")
const categoryRoute = require("./routes/category")
const productRoute = require("./routes/product")
const cloudinaryRoute = require("./routes/cloudinary")
const userRoute = require("./routes/user")
const connectDb = require("./database")

const app = express()
connectDb()
//Middlewares
app.use(logger("dev"))
app.use(express.json({ limit: "2mb" }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
)
app.use(cors())
// Route Middlewares :
app.use("/api/user", authRoute)
app.use("/api", categoryRoute)
app.use("/api", productRoute)
app.use("/api/", cloudinaryRoute)
app.use("/api/usercart/", userRoute)

app.listen(process.env.PORT || 3080, () => console.log("Server up and running"))
