let express = require('express');
let fetch = require('node-fetch');
let btoa = require('btoa');
let app = express();

const Server = 'https://api.chayns.net/v2.0/';
const Secret = 'Your Tapp Secret';
const ManagerUacGroup = 1;

app.get('/IsUserInGroup', function(req, res) {
    try {
        let url = Server + req.query.locationId + '/Uac/' + ManagerUacGroup + '/User/' + req.query.userId;
        let config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(req.query.tappId + ':' + Secret)
            }
        }
        fetch(url, config).then(response => {
            res.sendStatus(response.status);
        });
    }
    catch(e) {
        res.sendStatus(500);
    }
});
