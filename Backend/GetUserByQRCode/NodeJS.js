let express = require('express');
let fetch = require('node-fetch');
let btoa = require('btoa');
let app = express();

const Server = 'https://api.chayns.net/v2.0/';
const Secret = 'Your Tapp Secret';

app.get('/GetUserByQr', function(req, res) {
    try {
        let url = Server + req.query.locationId + '/User?qrcode=' + req.query.qrData;
        let config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(req.query.tappId + ':' + Secret)
            }
        }
        fetch(url, config).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    res.send(data.data);
                });
            } else 
                res.sendStatus(response.status);
        });
    }
    catch(e) {
        res.sendStatus(500);
    }
});
