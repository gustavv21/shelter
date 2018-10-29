var express  = require("express");
var router   = express.Router();
var Ankieta  = require("../models/ankieta");
var middleware  = require("../middleware/index.js");

router.get("/zgloszenia", middleware.checkAdmin, function(req, res) {
    Ankieta.find({},function(err, ankieta){
        if(err){
            console.log(err);
        } else {
            res.render("ankieta/zgloszenia", {ankieta: ankieta});
        }
    });
});

router.get("/ankieta", function(req, res) {
    res.render("ankieta/new");
});

router.post("/zgloszenia", middleware.checkAdmin, function(req, res) {
    req.body.ankieta.body = req.sanitize(req.body.ankieta.body);
    Ankieta.create(req.body.ankieta, function(err,newAnkieta){
        if(err){
            res.render("ankieta/new");
        } else {
            res.redirect("/adopcja");
        }
    });
});

router.get("/zgloszenia/:id", function(req, res) {
    Ankieta.findById(req.params.id, function(err, findAnkieta){
        if(err){
            res.redirect("/zgloszenia");
        } else {
            res.render("ankieta/show", {ankieta: findAnkieta});
        }
    });
});

module.exports = router;