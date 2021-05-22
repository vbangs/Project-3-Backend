/////////////////////////
// DEPENDENCIES
/////////////////////////
const express = require("express")
const {Schema, model} = require("./connection")

/////////////////////////
// The Application Object
/////////////////////////
const app = express()


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

// create
app.post("/books", (req, res) => {
    res.json("create")
})


// update
app.put("/books/:id", (req, res) => {
    res.json("update")
})

// delete
app.delete("/books/:id", (req, res) => {
    res.json("delete")
})

// show
app.get("/books/:id", (req, res) => {
    res.json("show")
})

/////////////////////////
// Listener
/////////////////////////
app.listen(1337, () => console.log("Listening on port 1337"))