require("dotenv").config();
const {PORT = 3000, MONGO} = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose")


// Database Connection
mongoose.connect(MONGO, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

// Connection Events
  mongoose.connection
    .on("open", () => console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconnected from mongoose"))
    .on("error", (error) => console.log(error));


    
// Test Route
app.get("/", (req, res) => {
    res.send("IT WORKS!");
  });



app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));