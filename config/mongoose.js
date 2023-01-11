const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/IMC_Development");

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error while connecting to mongoDB"));

db.once('open', function(){
    console.log("connect to db successfully");
});

module.exports = db;
