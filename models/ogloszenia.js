var mongoose = require("mongoose");

var ogloszenieSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    number: String,
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

module.exports = mongoose.model("Ogloszenie", ogloszenieSchema);