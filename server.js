/////////////////////////
// DEPENDENCIES
/////////////////////////
require("dotenv").config()
const {PORT = 3000, MONGO}
const express = require("express")
const {Schema, model} = require("./connection")
const mongoose = require("mongoose")

/////////////////////////
// The Application Object
/////////////////////////
const app = express()

// Database
mongoose.connect(MONGO, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error))


// SCHEMA
const bookSchema = new Schema ({
    id: String, 
    comment: String
})

// MODELS
const Books = model("Books", bookSchema)



/////////////////////////
// The Data
/////////////////////////
const testBooks = [
    {id: "123", comment: "interesting"},
    {name: "456", role: "boring"}
]

/////////////////////////
// MIDDLEWARE
/////////////////////////

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))


/////////////////////////
// Routes
/////////////////////////
app.get("/", (req, res) => {
    res.json(testBooks)
})


// index
app.get("/books", (req, res) => {
    // send the turtles array as JSON
    res.json("index")
})

// update
app.put("/books/:id", (req, res) => {
    res.json("update")
})

// delete
app.delete("/books/:id", (req, res) => {
    res.json("delete")
})

// create
app.post("/books", async (req, res) => {
  try {
    res.json(await Books.create(req.body))
  } catch (error) {
    res.status(400).json(error)
  }
})

// show
app.get("/books/:id", async (req, res) => {
  try {
    res.json(await Books.findById(req.params.id))
  } catch (error) {
    res.status(400).json(error)
  }
})



/////////////////////////
// Listener
/////////////////////////
app.listen(1337, () => console.log("Listening on port 1337"))