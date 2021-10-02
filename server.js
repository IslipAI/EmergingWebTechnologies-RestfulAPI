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
    db.run('CREATE TABLE Movies (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, release_year TEXT, time_viewed TEXT)');
});


//Collection API Routers
//GET COLLECTION
app.get("/api/", function(req, res){
    console.log("GET Request!");
    try{
        db.all("SELECT * FROM Movies", function(error, results){
            if(error){
                console.log(error);
            }else{
                console.log(results)
                res.send(results);
            }
        });
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
});


//PUT COLLECTION
app.put('/api/', function(req, res){
    try{
        console.log('PUT Request!')
        db.serialize(function(){
             //console.log(req.body);
            db.run('DELETE FROM Movies', function(error){
                if(error){
                    console.log(error);
                }
            });

            db.run("delete from sqlite_sequence where name='Movies'");

            var collection = req.body;
            sql = "INSERT INTO Movies (title, release_year, time_viewed) VALUES (?,?,?)";

            for(var i = 0; i < collection.length; i++){
                var date = new Date();
                db.run(sql, [collection[i].title, collection[i].release_year, date.toString()]);
            }
            res.send("REPLACE COLLECTION SUCCESSFUL");
        });
    }catch(error){
        res.sendStatus(500);
    }
});


//POST COLLECTION
app.post('/api/', function(req, res){
    try{
        console.log('POST Request!')
        //console.log(req.body)
        var date = new Date();
        sql = "INSERT INTO Movies (title, release_year, time_viewed) VALUES (?,?,?)";
        db.run(sql, [req.body.title, req.body.releaseyear, date.toString()]);
        res.send("CREATE ENTRY SUCCESSFUL");
    }catch(error){
        res.sendStatus(500);
    }
});


//DELETE COLLECTION
app.delete('/api/', function(req, res){
    console.log('DELETE Request!')
    db.run('DELETE * FROM Movies', function(error){
        if(error){
            console.log(error);
        }else{
            res.send('DELETE COLLECTION SUCCESSFUL')
        }
    });
});


//Item API Routers
//GET ITEM
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


//PUT ITEM
app.put('/api/:id', function(req, res){
    console.log('PUT Request!')
    sql = 'UPDATE Movies SET title = ?, release_year = ?, time_viewed = ? WHERE id = ?';

    db.run(sql, [req.body.title, req.body.releaseyear, new Date().toString(), req.params.id], function(error){
        if(error){
            console.log(error);
        }else{
            res.send("UPDATE ITEM SUCCESSFUL")
        }
    });
});


//DELETE ITEM
app.delete('/api/:id', function(req, res){
    console.log('DELETE Request!')
    db.run('DELETE FROM Movies WHERE id = ?', [req.params.id], function(error){
        if(error){
            console.log(error);
        }else{
            res.send('DELETE ITEM SUCCESSFUL');
        }
    });
});



const server = app.listen(3000, function(){
    console.log("Server listening...")
});