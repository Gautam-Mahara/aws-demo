const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
    "name": String,
    "age": String,
    "Occupation": String,
    "Gender": String,
    "Relationship": String,
    "Race": String
});

const ResponseSchema = mongoose.model("Response", responseSchema);

module.exports = ResponseSchema;