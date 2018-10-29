var Animal      = require("../models/animal"),
    Ankieta     = require("../models/ankieta"),
    Ogloszenia  = require("../models/ogloszenia");

var middlewareObj = {};

middlewareObj.checkAdmin = function(req,res,next){
    if(req.isAuthenticated()){
            Animal.findById(req.params.id, function(err, foundAnimal){
                if(err){
                    res.redirect("back");
                } else {
                    if(req.user.isAdmin) {
                        next();
                    } else {
                        res.redirect("back");
                    }
                }
            });
    } else {
        res.redirect("back");
    }
};

middlewareObj.checkOwner = function(req,res,next){
    if(req.isAuthenticated()){
            Ogloszenia.findById(req.params.id, function(err, foundOgloszenie){
                if(err){
                    req.flash("error", "Ogłoszenie nie działa");
                    res.redirect("back");
                } else {
                    if(foundOgloszenie.author.id.equals(req.user._id) || req.user.isAdmin) {
                        next();
                    } else {
                        req.flash("error", "Musisz być zalogowany, aby to zrobić");
                        res.redirect("back");
                    }
                }
            });
    } else {
        req.flash("error", "Musisz być zalogowany, aby to zrobić");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Musisz być zalogowany, aby to zrobić");
    res.redirect("/login");
};

module.exports = middlewareObj;