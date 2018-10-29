var mongoose = require("mongoose");

var ankietaSchema = new mongoose.Schema({
    dane: String,
    number: String,
    losob: String,
    dom: String,
    zgoda: String,
    inne: String,
    opis: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports= mongoose.model("Ankieta", ankietaSchema);