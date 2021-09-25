const express = require('express');
const app = express();

app.get("/api/", function(req, res){
    console.log("Get request!");
    res.send("Hello there1");
});

const server = app.listen(3000, function(){
    console.log("Server listening...")
});