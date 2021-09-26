/*
StAuth10222: I Alexander Islip, 000786144 certify that this material is my original work. 
No other person's work has been used without due acknowledgement. 
I have not made my work available to anyone else
*/

const express = require('express');
const sqlite3 = require("sqlite3").verbose();
var bodyParser = require('body-parser');
const app = express();
const db = new sqlite3.Database("api.db");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//Initialize fresh table upon api startup.
db.serialize(function(){
    db.run("DROP TABLE IF EXISTS Movies");
    db.run('CREATE TABLE Movies (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, release_year TEXT, time_viewed DATETIME)');
});

//Collection API Routers
app.get("/api/", function(req, res){
    console.log("GET Request!");

    db.all("SELECT * FROM Movies", function(error, results){
        if(error){
            console.log(error);
        }else{
            console.log(results)
            res.send(results);
        }
    });
});

app.put('/api/', function(req, res){
    console.log('PUT Request!')
    res.send("Collection PUT REQUEST");
});

app.post('/api/', function(req, res){
    console.log('POST Request!')
    console.log(req.body)

    db.run("INSERT INTO Movies (title, release_year, time_viewed) VALUES (?,?,?)", [req.body.title, req.body.releaseyear, new Date()]);
    
    res.send("Collection POST REQUEST");
});

app.delete('/api/', function(req, res){
    console.log('DELETE Request!')
    db.run('DELETE * FROM Movies', function(error){
        if(error){
            console.log(error);
        }else{
            res.send('DELETE COLLECTION SUCCESSFUL')
        }
    });
    res.send("Collection DELETE REQUEST");
});


//Item API Routers
app.get('/api/:id', function(req, res){
    console.log('GET Request!')
    sql = 'SELECT * FROM Movies WHERE id = ?';
    db.get(sql, [req.params.id], function(error, results){
        if(error){
            console.log(error);
        }else{
            console.log(results);
            res.send(results);
        }
    });
});

app.put('/api/:id', function(req, res){
    console.log('PUT Request!')
    res.send("Item PUT REQUEST");
});

app.delete('/api/:id', function(req, res){
    console.log('DELETE Request!')
    db.run('DELETE FROM Movies WHERE id = ?', [req.params.id], function(error){
        if(error){
            console.log(error);
        }else{
            res.send('DELETE ITEM WAS SUCCESSFUL');
        }
    });
});


const server = app.listen(3000, function(){
    console.log("Server listening...")
});