/*
StAuth10222: I Alexander Islip, 000786144 certify that this material is my original work. 
No other person's work has been used without due acknowledgement. 
I have not made my work available to anyone else
*/

//Import axios package
const axios = require('axios');

//Global variable for test state.
let testpass = true;
let testlocation = '';

//Function calls all Test One subtests.
function TestOne(){
    PostRequestTestOne('Now You See Me', 2013);
    setTimeout(() =>  PostRequestTestOne('Grown Ups', 2010), 100);
    setTimeout(() =>  PutRequestTestOne(1, 'Weekend At Bernies', 1989), 200);
    setTimeout(() =>  GetRequestTestOne(1, 'Weekend At Bernies', 1989), 300);
    setTimeout(() =>  GetRequestTestOne(2, 'Grown Ups', 2010), 400);
}

//POST request with axios
//Returns true if response matches CREATE ENTRY SUCCESSFUL.
function PostRequestTestOne(title, releaseyear){
    axios.post('http://localhost:3000/api/', {
        title: title,
        releaseyear: releaseyear, 
    }).then(function(response){
        //console.log(response.data)
        responsestring = response.data.toString();
        if(responsestring === 'CREATE ENTRY SUCCESSFUL'){
            VerifyTest(true, '1');
        }else{
            VerifyTest(false, '1');
        }
    }).catch(function(error){
        console.log(error)
    });
}

//PUT request with axios
//Returns true if response matches UPDATE ITEM SUCCESSFUL.
function PutRequestTestOne(id, title, releaseyear){
    axios.put('http://localhost:3000/api/' + id.toString() + '/', {
        title: title,
        releaseyear: releaseyear,
    }).then(function(response){
        //console.log(response.data);
        responsestring = response.data.toString();
        if(responsestring === 'UPDATE ITEM SUCCESSFUL'){
            VerifyTest(true, '2');
        }else{
            VerifyTest(false, '2');
        }
    }).catch(function(error){
        console.log(error);
        return false;
    });
}

//GET request with axios
//Returns true if request response matches to expected.
function GetRequestTestOne(id, expectedtitle, expectedreleaseyear){
    axios.get('http://localhost:3000/api/' + id.toString() + '/')
    .then(function(response){
        //console.log(response.data);
        responsestringtitle = response.data.title.toString();
        responsereleaseyear = response.data.release_year;
        if(responsestringtitle === expectedtitle && responsereleaseyear.toString() === expectedreleaseyear.toString()){
            VerifyTest(true, '3');
        }else{
            VerifyTest(false, '3');
        }
    })
    .catch(function(error){
        console.log(error);
    });
}

//Function calls all Test Two subtests.
async function TestTwo(){
    //Expected list of movies.
    const movies = [
        {
            "title" : "Venom",
            "release_year" : 2018
        },
        {
            "title" : "The Addams Family",
            "release_year" : 2019
        },
        {
            "title" : "Interstellar",
            "release_year" : 2014
        },  
        {
            "title" : "A Dogs Purpose",
            "release_year" : 2017
        }
    ];
    PutRequestTestTwo(movies); 

    setTimeout(() => {GetRequestTestTwo(movies)}, 500);

    setTimeout(() => {DeleteRequestByIdTestTwo(3)}, 600);

    //Expected list of movies.
    const moviestwo = [
        {
            "title" : "Venom",
            "release_year" : 2018
        },
        {
            "title" : "The Addams Family",
            "release_year" : 2019
        }, 
        {
            "title" : "A Dogs Purpose",
            "release_year" : 2017
        }
    ];
    setTimeout(() => {GetRequestTestTwo(moviestwo)}, 700);

    setTimeout(() => {DeleteRequestCollectionTestTwo()}, 800);

    //Expected list of movies.
    const moviesthree = [];
    setTimeout(() => {GetRequestTestTwo(moviesthree)}, 900);
}

//PUT request with axios
//Returns true if response matches UPDATE COLLECTION SUCCESSFUL.
async function PutRequestTestTwo(collection){
    await axios.put('http://localhost:3000/api/', collection
    ).then(function(response){
        //console.log(response.data);
        responsestring = response.data.toString();
        if(responsestring === 'REPLACE COLLECTION SUCCESSFUL'){
         VerifyTest(true, '4');
        }else{
         VerifyTest(false, '4');
        }
    }).catch(function(error){
        console.log(error);
    });
}

//GET request with axios
//Returns true expectedcollection matches actual collection.
async function GetRequestTestTwo(expectedcollection){
    var request = axios.get('http://localhost:3000/api/')
    .then(function(response){
        //console.log(response.data)
        return response;
    })
    .catch((error) => console.log(error));

    var collection = null;
    await request.then((request) => {return request})
    .then((value)=> {return value.data})
    .then(function(value){
        //console.log(value);
        collection = value;
    });
    //console.log(collection);

    if(expectedcollection.length > 0){
        for (let i = 0; i < collection.length; i++) {
            //console.log(collection[i].title);
            //console.log(expectedcollection[i].title);
            if(collection[i].title != expectedcollection[i].title){
             VerifyTest(false, '5');
                break;
            }
        }
    }else{
        if(collection.length != 0){
         VerifyTest(false, '5');
        }
    }
}

//DELETE by id request with axios
//Returns true if response matches DELETE ITEM SUCCESSFUL.
function DeleteRequestByIdTestTwo(id){
    //console.log('Deleting item')
    axios.delete('http://localhost:3000/api/' + id.toString() + '/')
    .then(function(response){
        //console.log(response);
        if(response.data === 'DELETE ITEM SUCCESSFUL'){
         VerifyTest(true, '6');
        }else{
         VerifyTest(false, '6');
        }
    }).catch(function(error){
        console.log(error);
    });
}

//DELETE collection request with axios
//Returns true if response matches DELETE COLLECTION SUCCESSFUL.
function DeleteRequestCollectionTestTwo(){
    //console.log('Deleting collection')
    axios.delete('http://localhost:3000/api/')
    .then(function(response){
        if(response.data === 'DELETE COLLECTION SUCCESSFUL'){
         VerifyTest(true, '7');
        }else{
         VerifyTest(false, '7');
        }
    })
    .catch(function(error){
        console.log(error);
    });
}

//Function runs test one and test two.
async function RunAllTest(){
    await TestOne();
    setTimeout(()=> TestTwo(), 1000);
}

//Call back for test state. True is a pass/False is a fail.
function VerifyTest(state, location){
    if(state === false){
        testpass = state;
        testlocation = location;
    }
}

//Returns the test result (Pass/Fail).
function GetTestResult(){
    if(testpass === true){
        console.log("ALL TEST SUCCESSFUL")
    }else{
        console.log("TESTS HAVE FAILED AT TEST " + testlocation)
    }
}


RunAllTest();
setTimeout(() => GetTestResult(), 3000);
