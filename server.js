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
    {id: "456", comment: "boring"}
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
app.get("/books", async (req, res) => {
  try {
    // send all people
    res.json(await Books.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
})



// update
app.put("/books/:id", async (req, res) => {
    try {
      res.json(await Books.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    } catch (error) {
      res.status(400).json(error)
    }
})

// delete
app.delete("/books/:id", async (req, res) => {
  try {
    // send all people
    res.json(await Books.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
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