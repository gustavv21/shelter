var express  = require("express");
var router   = express.Router();
var Animal  = require("../models/animal");
var middleware  = require("../middleware/index.js");

router.get("/adopcja", function(req,res){
    Animal.find({}, function(err,animals){
        if(err){
            console.log(err);
        } else {
            res.render("adopcja/index", {animals: animals, currentUser: req.user});
        }
    });
});

router.post("/adopcja", middleware.checkAdmin, function(req,res){
    // req.body.animal.body = req.sanitize(req.body.animal.body);
    
    var name= req.body.name;
    var image = req.body.image;
    var dsc = req.body.dsc;
    var age = req.body.age;
    var sex= req.body.sex;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newAnimal = {name: name, image: image, dsc: dsc, age: age, sex: sex, author:author};
    Animal.create(newAnimal, function(err,newAnimal){
        if(err){
            res.render("adopcja/new");
        } else {
            res.redirect("/adopcja");
        }
    });
});

router.get("/adopcja/new", middleware.checkAdmin, function(req, res) {
    res.render("adopcja/new");
});

router.get("/adopcja/:id", function(req, res) {
    Animal.findById(req.params.id, function(err, foundAnimal){
        if(err){
            res.redirect("/adopcja");
        } else {
            res.render("adopcja/show", {animal: foundAnimal});
        }
    });
});

router.get("/adopcja/:id/edit", middleware.checkAdmin, function(req, res) {
    Animal.findById(req.params.id, function(err,foundAnimal){
        if(err){
            res.redirect("/adopcja");
        } else {
            res.render("adopcja/edit", {animal: foundAnimal});
        }
    });
});

router.put("/adopcja/:id", middleware.checkAdmin, function(req, res) {
    req.body.animal.body = req.sanitize(req.body.animal.body);
    Animal.findByIdAndUpdate(req.params.id, req.body.animal, function(err, updateAnimal){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/adopcja/" + req.params.id);
        }
    });
});

router.delete("/adopcja/:id", middleware.checkAdmin, function(req,res){
    Animal.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.redirect("/adopcja");
        } else {
            res.redirect("/adopcja");
        }
    });
});

module.exports = router;