const axios = require('axios');

function TestOne(){
    console.log('TEST ONE STARTED...');
    PostRequestTestOne('Now You See Me', 2013);
    PostRequestTestOne('Grown Ups', 2010);
}

function PostRequestTestOne(title, releaseyear){
    var requestsuccessul = true;
    axios.post('http://localhost:3000/api/', {
        title: title,
        releaseyear: releaseyear, 
    }).then(function(reponse){
        console.log(reponse.data)
    }).catch(function(error){
        console.log(error)
    });
}

function PutRequestTestOne(){
    axios.put('http://localhost:3000/api/1', {
        title: 'Weekend At Bernies',
        releaseyear: 1989,
    }).then(function(response){
        console.log(response.data);
    }).catch(function(error){
        console.log(error);
    });
}


function TestTwo(){
    console.log('TEST TWO STARTED...');
}


TestOne();
TestTwo();