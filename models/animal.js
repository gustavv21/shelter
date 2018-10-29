var mongoose = require("mongoose");

var animalSchema = new mongoose.Schema({
    name: String,
    image: String,
    dsc: String,
    age: String,
    sex: String,
    createdAt: { type: Date, default: Date.now },
    author: 
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Animal", animalSchema);