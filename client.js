//Import axios package
const axios = require('axios');

//Test one function
async function TestOne(){
    console.log('TEST ONE STARTED...');
    await ResetCollection();
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
            console.log('TEST ONE PASSED');
    }else{
        console.log('TEST ONE FAILED')
    }
}

function ResetCollection(){
    axios.delete('http://localhost:3000/api/');
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
}

function PutRequestTestTwo(collection){
    var requeststatus = axios.put('http://localhost:3000/api/', collection
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

function GetRequestTestTwo(expectedcollection){
    var requeststatus = axios.get('http://localhost:3000/api/').then(function(response){
        console.log(response.data);
    })
    .catch(function(error){
        console.log(error);
        return false;
    });
    return requeststatus;
}

async function RunAllTest(){
    await TestOne();
    await TestTwo();
}

RunAllTest();
