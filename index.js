const express = require('express');
const app = express();
const port = 8000;

const mongoose = require('mongoose');
const db = require('./config/mongoose');
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static("./assets"));

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error while running the server on port ${port}`);
        return;
    }
    console.log(`server running on port ${port}`);
});