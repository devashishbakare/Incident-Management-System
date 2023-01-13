const express = require('express');
const app = express();
const port = 8000;

//required libararies 
const mongoose = require('mongoose');
const db = require('./config/mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const expressLayouts = require('express-ejs-layouts');

//cookie parser and for its use
const cookieParser = require("cookie-parser"); 
app.use(cookieParser());

//encoding the body of form
app.use(express.urlencoded({extended : true}));

//assest address 
app.use(express.static("./assets"));

//layout use and extracter for script and style
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//view engine and views location
app.set('view engine', 'ejs');
app.set('views', './views');

//creating session in cookie and store them in mongodb
app.use(session({
    name : 'Incident Management System',
    secret : "decodebythis",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge : (1000 * 60 * 100) },
    store : mongoStore.create({
        mongoUrl: 'mongodb://localhost/IMC_Development',
        mongooseConnection : db,
        autoRemove: 'disabled'
    }, function(err){
        console.log(err || "connect-mongo setup ok");
    })

}));

//Initilazing possport and calling seesion 
app.use(passport.initialize());
app.use(passport.session());

//settin user data to locals to access them in views
app.use(passport.setAuthenticatedUser);

//address of routes
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error while running the server on port ${port}`);
        return;
    }
    console.log(`server running on port ${port}`);
});