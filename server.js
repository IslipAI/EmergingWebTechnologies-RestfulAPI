/*
StAuth10222: I Alexander Islip, 000786144 certify that this material is my original work. 
No other person's work has been used without due acknowledgement. 
I have not made my work available to anyone else
*/

//Import required packages
const express = require('express');
const sqlite3 = require("sqlite3").verbose();
var bodyParser = require('body-parser');
const app = express();

//Import database
const db = new sqlite3.Database("api.db");


//Pass middleware to app.
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
        //Select all from movies
        db.all('SELECT * FROM Movies', function(error, results){
            if(error){
                console.log(error);
            }else{
                console.log(results)
                res.send(results);
            }
        });
        //Update time it was viewed.
        db.run('UPDATE Movies SET time_viewed = ?', 
        [new Date().toString()], function(error){
            if(error){
                console.log(error);
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
             //Delete all movies
            db.run('DELETE FROM Movies', function(error){
                if(error){
                    console.log(error);
                }
            });
            //Reset sql auto increment id.
            db.run("delete from sqlite_sequence where name='Movies'");

            var collection = req.body;
            sql = "INSERT INTO Movies (title, release_year, time_viewed) VALUES (?,?,?)";
            
            //loop through collection and insert each object.
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

//DELETE COLLECTION
app.delete('/api/', function(req, res){
    console.log('DELETE Request!')
    db.serialize(function(){
        db.run('DELETE FROM Movies', function(error){
            if(error){
                console.log(error);
            }else{
                res.send('DELETE COLLECTION SUCCESSFUL')
            }
        });
        db.run("delete from sqlite_sequence where name='Movies'");
    });
});


//Item API Routers
//GET ITEM
app.get('/api/:id', function(req, res){
    console.log('GET Request!')
    sql = 'SELECT * FROM Movies WHERE id = ?';
    //select row by id passed in params.
    db.get(sql, [req.params.id], function(error, results){
        if(error){
            console.log(error);
        }else{
            console.log(results);
            res.send(results);
        }
    });

    //update rows time viewed by id passed in params.
    db.run('UPDATE Movies SET time_viewed = ? WHERE id = ?', 
    [new Date().toString(), req.params.id], function(error){
        if(error){
            console.log(error);
        }
    });
});


//POST ITEM
app.post('/api/', function(req, res){
    try{
        console.log('POST Request!')
        //console.log(req.body)
        var date = new Date();
        sql = "INSERT INTO Movies (title, release_year, time_viewed) VALUES (?,?,?)";
        //Insert new entry by data passed in body.
        db.run(sql, [req.body.title, req.body.releaseyear, date.toString()]);
        res.send("CREATE ENTRY SUCCESSFUL");
    }catch(error){
        res.sendStatus(500);
    }
});


//PUT ITEM
app.put('/api/:id', function(req, res){
    console.log('PUT Request!')
    sql = 'UPDATE Movies SET title = ?, release_year = ?, time_viewed = ? WHERE id = ?';

    //Update row by id passed in params
    db.run(sql, [req.body.title, req.body.releaseyear, 
        new Date().toString(), req.params.id], function(error){
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
    //Delete row by id passed in params.
    db.run('DELETE FROM Movies WHERE id = ?', [req.params.id], function(error){
        if(error){
            console.log(error);
        }else{
            res.send('DELETE ITEM SUCCESSFUL');
        }
    });
});


//Start server on port 3000.
const server = app.listen(3000, function(){
    console.log("Server listening...")
});