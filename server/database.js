const mongoose = require("mongoose")
require("dotenv").config()

const connectDb = () => {
  mongoose
    .connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log("Connected succesfuly to database"))

  mongoose.connection.on("error", (err) => {
    console.log(
      `Connection to database failed due to following error: ${err.message}`
    )
  })
}

module.exports = connectDb
