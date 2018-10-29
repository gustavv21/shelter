var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    sanitizer       = require("express-sanitizer"),
    methodOverride  = require("method-override"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    Animal          = require("./models/animal"),
    Ankieta         = require("./models/ankieta"),
    Ogloszenie      = require("./models/ogloszenia"),
    User            = require("./models/user");
    
    
var authRoutes       = require("./routes/auth"),
    animalRoutes     = require("./routes/animal"),
    ankietaRoutes    = require("./routes/ankieta"),
    ogloszeniaRoutes = require("./routes/ogloszenia");

// mongoose.connect("mongodb://localhost/schronisko");
mongoose.connect("mongodb://gustav:Gustav1@ds145053.mlab.com:45053/newyork");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(sanitizer());
app.use(methodOverride("_method"));
app.use(flash());


app.use(require("express-session")({
    secret: "fifa",
    resave: false,
    saveUninitialized: false
}));

app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use(authRoutes);
app.use(animalRoutes);
app.use(ankietaRoutes);
app.use(ogloszeniaRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("serwer is on");
});