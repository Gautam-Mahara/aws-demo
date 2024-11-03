const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Jenn:Janki6121@cluster0.vqk5j27.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
.catch(error => console.error("MongoDB connection error:", error));

// Define the schema with lowercase field names
const responseSchema = new mongoose.Schema({
  userid: String,
  name: String,
  age: String,
  Occupation: String,
  Gender: String,
  Relationship: String,
  Race: String
});

const ResponseModel = mongoose.model('Response', responseSchema);

app.post("/save-response", async (req, res) => {
  try {
    console.log("Received request:", req.body); // Check if request is received

    const answers = req.body.answers;
    // Create and save new response with adjusted field names
    const newResponse = new ResponseModel({
      name: answers.Name,
      age: answers.Age,
      Occupation: answers.Occupation,
      Gender: answers.Gender,
      Relationship: answers.Relationship,
      Race: answers.Race
    });
    
    await newResponse.save();

    res.status(200).send("Response saved successfully");
    console.log("Response saved successfully"); // Confirm save
  } catch (error) {
    res.status(500).send("Error saving response");
    console.error("Error saving response:", error);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
