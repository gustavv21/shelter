var express  = require("express");
var router   = express.Router();
var Ogloszenie  = require("../models/ogloszenia");
var middleware  = require("../middleware/index.js");

router.get("/ogloszenia", function(req, res) {
    Ogloszenie.find({}, function(err, ogloszenie){
        if(err){
            console.log(err);
        } else {
            res.render("ogloszenia/index", {ogloszenie: ogloszenie, currentUser: req.user});
        }
    });
});

router.post("/ogloszenia", middleware.isLoggedIn, function(req,res){
    // req.body.ogloszenie.body = req.sanitize(req.body.ogloszenie.body);
    var title= req.body.title;
    var image = req.body.image;
    var body = req.body.body;
    var number = req.body.number;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newOgloszenie = {title: title, image: image, body: body, number: number, author: author};
    // console.log(req.user)
    Ogloszenie.create(newOgloszenie, function(err,newOgloszenie){
        if(err){
            res.render("ogloszenia/new");
        } else {
            // console.log(newOgloszenie)
            // Ogloszenie.author.id = req.user._id;
            res.redirect("/ogloszenia");
        }
    });
});

router.get("/ogloszenia/new", middleware.isLoggedIn, function(req, res) {
    res.render("ogloszenia/new");
});

// app.get("/ogloszenia/:id", function(req, res) {
//     Ogloszenie.findById(req.params.id, function(err, foundOgloszenie){
//         if(err){
//             res.redirect("/ogloszenia");
//         } else {
//             res.render("ogloszenia/index", {ogloszenie: foundOgloszenie});
//         }
//     });
// });

router.get("/ogloszenia/:id/edit", middleware.checkOwner, function(req, res) {
    Ogloszenie.findById(req.params.id, function(err, foundOgloszenie){
        if(err){
            res.redirect("/ogloszenia");
        } else {
            res.render("ogloszenia/edit", {ogloszenie: foundOgloszenie});
        }
    });
});

router.put("/ogloszenia/:id", middleware.checkOwner, function(req,res){
    req.body.ogloszenie.body = req.sanitize(req.body.ogloszenie.body);
    Ogloszenie.findByIdAndUpdate(req.params.id, req.body.ogloszenie, function(err,updateOgloszenie){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/ogloszenia");
        }
    });
});

router.delete("/ogloszenia/:id", middleware.checkOwner, function(req,res){
   Ogloszenie.findByIdAndDelete(req.params.id, function(err){
       if(err){
           res.redirect("/ogloszenia");
       } else {
           res.redirect("/ogloszenia");
       }
   });
});

module.exports = router;