/////////////////////////
// DEPENDENCIES
/////////////////////////
const express = require("express")
const {Schema, model} = require("./connection")
const cors = require("cors")
const morgan = require("morgan")

/////////////////////////
// The Application Object
/////////////////////////
const app = express()


// SCHEMA
const commentSchema = new Schema ({
    id: String, 
    comment: String
})

// MODELS
const Comments = model("Comments", commentSchema)



/////////////////////////
// The Data
/////////////////////////
const testComments = [
    {id: "123", comment: "interesting"},
    {id: "456", comment: "boring"},
    {id: "Z_2tDwAAQBAJ", comment: "Hello!"}
    {id: "Z_2tDwAAQBAJ", comment: "Not Hello!"}
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
    res.json(testComments)
})



// index
app.get("/books", async (req, res) => {
  try {
    // send all people
    res.json(await Comments.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
})



// update
app.put("/books/:id", async (req, res) => {
    try {
      res.json(await Comments.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    } catch (error) {
      res.status(400).json(error)
    }
})

// delete
app.delete("/books/:id", async (req, res) => {
  try {
    // send all people
    res.json(await Comments.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
})


// create
app.post("/books", async (req, res) => {
  try {
    res.json(await Comments.create(req.body))
  } catch (error) {
    res.status(400).json(error)
  }
})



// show
app.get("/books/:id", async (req, res) => {
  try {
    res.json(await Comments.findById(req.params.id))
  } catch (error) {
    res.status(400).json(error)
  }
})

/////////////////////////
// Listener
/////////////////////////
app.listen(process.env.PORT, () => console.log("Listening on port 3000"))