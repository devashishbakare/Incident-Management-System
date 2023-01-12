const express = require('express');
const app = express();
const port = 8000;

const mongoose = require('mongoose');
const db = require('./config/mongoose');

const session = require('express-session');
const mongoStore = require('connect-mongo');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const cookieParser = require("cookie-parser"); 
app.use(cookieParser());

app.use(express.urlencoded({extended : true}));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static("./assets"));

app.use(session({
    name : 'Incident Management System',
    secret : "decodebythis",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge : (1000 * 60 * 100) },
    store : mongoStore.create({
        mongoUrl: 'mongodb://localhost/IMC_Development',
        mongooseConnection : db,
        autoRemove: 'disabled'
    }, function(err){
        console.log(err || "connect-mongo setup ok");
    })

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error while running the server on port ${port}`);
        return;
    }
    console.log(`server running on port ${port}`);
});