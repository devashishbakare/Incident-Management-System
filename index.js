const express = require('express');
const app = express();
const port = 8000;


app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error while running the server on port ${port}`);
        return;
    }
    console.log(`server running on port ${port}`);
});