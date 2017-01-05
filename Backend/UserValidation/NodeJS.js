var app = require('express')();
var fetch = require('node-fetch');
var http = require('http').Server(app);
var Promise = require('promise');


var Server = 'https://api.chayns.net/v2.0/' + chayns.env.site.locationId;

app.post('/ValidateUser', function(req, res) {

    //Get Parameters
    var jsonString = '';
    req.on('data', function(data) {

        if(data != '"') {

            //Build content string
            jsonString += data;

        }

    });
    req.on('end',function(){

        //Format content
        var accessToken = jsonString.replace('\"', '').replace('\"', '');

        GetUser(accessToken)
            .then(function (user) {

                //Return the user
                res.send(user);

            })
            .catch(function (info) {

                //Can't find an user
                res.sendStatus(401);

            });
    });
});

function GetUser(accessToken) {
    return new Promise(function(resolve, reject) {

        //Build the request
        var url = Server + '/AccessToken';
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic' + btoa(tappId + ':' + Secret)
            }
        };

        //Run the request
        fetch(url, config).then(function(response) {
            if(response.ok) {

                //Just return the user data
                response.json().then(function (data) {
                    resolve(data.data[0]);
                });

            }
            else {
                //Throw an error
                reject(response);

            }
        });
    });
}
