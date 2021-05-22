/// grab environment variables
require("dotenv").config()

/// IMPORT MONGOOSE
const mongoose = require("mongoose")

// IMPORT MERCED LOGGER FOR COLORFUL LOGS
const {log} = require("mercedlogger")

// Bring in our database string from .env or default string
const MONGO = process.env.MONGO || "mongodb://localhost:27017/defaultdb"

///////////////////////////////////
// Mongoose Configuration Object to Avoid Warnings
///////////////////////////////////
const config = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}

///////////////////////////////////
// Making the Database Connection
///////////////////////////////////
mongoose.connect(MONGO, config)

///////////////////////////////////
// Handling Connection Events
///////////////////////////////////
mongoose.connection
// Event for When Connection Opens
.on("open", () => log.green("STATUS", "Connected to Mongo"))
// Event for When Connection Closes
.on("close", () => log.red("STATUS", "Disconnected from Mongo"))
// Event for Connection Errors
.on("error", (error) => log.red("ERROR", error))

///////////////////////////////////
// Exporting Our Connection
///////////////////////////////////
module.exports = mongoose