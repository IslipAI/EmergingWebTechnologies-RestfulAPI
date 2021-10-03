//Import axios package
const axios = require('axios');
const { response } = require('express');


//Function calls all Test One subtests.
async function TestOne(){
    console.log('TEST ONE STARTED...');
    var subtestone = await PostRequestTestOne('Now You See Me', 2013);
    var subtesttwo = await PostRequestTestOne('Grown Ups', 2010);
    var subtestthree = await PutRequestTestOne(1, 'Weekend At Bernies', 1989);
    var subtestfour = await GetRequestTestOne(1, 'Weekend At Bernies', 1989);
    var subtestfive = await GetRequestTestOne(2, 'Grown Ups', 2010);
    if(subtestone === true &&
        subtesttwo === true &&
        subtestthree === true &&
        subtestfour === true &&
        subtestfive === true){
            console.log("TEST ONE SUCCESSFUL");
    }
}


//POST request with axios
//Returns true if response matches CREATE ENTRY SUCCESSFUL.
function PostRequestTestOne(title, releaseyear){
    var requeststatus = axios.post('http://localhost:3000/api/', {
        title: title,
        releaseyear: releaseyear, 
    }).then(function(response){
        //console.log(response.data)
        responsestring = response.data.toString();
        if(responsestring === 'CREATE ENTRY SUCCESSFUL'){
            return true;
        }else{
            return false;
        }
    }).catch(function(error){
        console.log(error)
        return false;
    });
    return requeststatus;
}


//PUT request with axios
//Returns true if response matches UPDATE ITEM SUCCESSFUL.
function PutRequestTestOne(id, title, releaseyear){
    var requeststatus = axios.put('http://localhost:3000/api/' + id.toString() + '/', {
        title: title,
        releaseyear: releaseyear,
    }).then(function(response){
        //console.log(response.data);
        responsestring = response.data.toString();
        if(responsestring === 'UPDATE ITEM SUCCESSFUL'){
            return true;
        }else{
            return false;
        }
    }).catch(function(error){
        console.log(error);
        return false;
    });
    return requeststatus;
}


//GET request with axios
//Returns true if request response matches to expected.
function GetRequestTestOne(id, expectedtitle, expectedreleaseyear){
    var requeststatus = axios.get('http://localhost:3000/api/' + id.toString() + '/')
    .then(function(response){
        //console.log(response);
        responsestringtitle = response.data.title.toString();
        responsereleaseyear = response.data.release_year;
        if(responsestringtitle === expectedtitle && responsereleaseyear.toString() === expectedreleaseyear.toString()){
            return true;
        }else{
            return false;
        }
    })
    .catch(function(error){
        console.log(error);
        return false;
    });
    return requeststatus;
}


//Function calls all Test Two subtests.
async function TestTwo(){
    console.log('TEST TWO STARTED...');
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
            "title" : "The Addams Family",
            "release_year" : 2019
        },  
        {
            "title" : "The Addams Family",
            "release_year" : 2019
        }
    ];
    var subtestone = await PutRequestTestTwo(movies); 
    var subtesttwo = await GetRequestTestTwo(movies);
    var subtestthree = await DeleteRequestByIdTestTwo(3);
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
            "title" : "The Addams Family",
            "release_year" : 2019
        }
    ];
    var subtestfour = await GetRequestTestTwo(moviestwo);
    var subtestfive = await DeleteRequestCollectionTestTwo();
    const moviesthree = [];
    var subtestsix = await GetRequestTestTwo(moviesthree);

    if(subtestone === true &&
        subtesttwo === true &&
        subtestthree === true &&
        subtestfour === true &&
        subtestfive === true &&
        subtestsix === true){
            console.log("TEST TWO SUCCESSFUL!");
        }
}


//PUT request with axios
//Returns true if response matches UPDATE COLLECTION SUCCESSFUL.
async function PutRequestTestTwo(collection){
    var requeststatus = await axios.put('http://localhost:3000/api/', collection
    ).then(function(response){
        //console.log(response.data);
        responsestring = response.data.toString();
        if(responsestring === 'REPLACE COLLECTION SUCCESSFUL'){
            return true;
        }else{
            return false;
        }
    }).catch(function(error){
        console.log(error);
        return false;
    });

    return requeststatus;
}

//GET request with axios
//Returns true expectedcollection matches actual collection.
async function GetRequestTestTwo(expectedcollection){
    var request = axios.get('http://localhost:3000/api/')
    .then(async function(response){
        console.log(response.data)
        return response;
    })
    .catch((error) => console.log(error));


    console.log(request);

    var collection = null;
    var resolvepromise = await request.then((request) => {return request})
    .then((value)=> {return value.data})
    .then(function(value){
        //console.log(value);
        collection = value;
    });

    console.log(collection);

    var expected = true;
    if(expectedcollection.length > 0){
        for (let i = 0; i < collection.length; i++) {
            if(collection[i].title != expectedcollection[i].title){
                expected = false;
                break;
            }
        }
    }else{
        if(collection.length != 0){
            expected = false;
        }
    }
    return expected;
}


//DELETE request with axios
//Returns true if response matches DELETE ITEM SUCCESSFUL.
function DeleteRequestByIdTestTwo(id){
    var requeststatus = axios.delete('http://localhost:3000/api/' + id.toString() + '/')
    .then(function(response){
        //console.log(response);
        if(response.data === 'DELETE ITEM SUCCESSFUL'){
            return true;
        }else{
            return false;
        }
    }).catch(function(error){
        console.log(error);
    });
    return requeststatus;
}


//DELETE request with axios
//Returns true if response matches DELETE COLLECTION SUCCESSFUL.
function DeleteRequestCollectionTestTwo(){
    var requeststatus = axios.delete('http://localhost:3000/api/').then(function(response){
        if(response.data === 'DELETE COLLECTION SUCCESSFUL'){
            return true;
        }else{
            return false;
        }
    }).catch(function(error){
        console.log(error);
    });
    return requeststatus;
}


async function RunAllTest(){
    await TestOne();
    await TestTwo();
}

RunAllTest();
