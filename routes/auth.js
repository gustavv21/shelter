var express  = require("express");
var router   = express.Router();
var User     = require("../models/user");
var passport = require("passport");

router.get("/", function(req,res){
    res.render("home");
});

router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    if(req.body.adminCode === "123"){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        } 
        passport.authenticate("local")(req,res,function(){
            req.flash("success", "Witamy Cię " + user.username);
            res.redirect("/");
        });
    });
});

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/", 
        failureRedirect: "/login"
        
    }), function(req, res) {
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Wylogowanie przebiegło pomyślnie!");
    res.redirect("/");
});

module.exports = router;