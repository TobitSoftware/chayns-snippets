let express = require('express');
let fetch= require('node-fetch');
let btoa = require('btoa');
let bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json());

const Server = 'https://api.chayns.net/v2.0/';
const Secret = 'Your tapp secret';

app.post('/Email', function (req, res) {
    try {
        let url = Server + req.query.locationId + '/Email';
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(req.query.tappId + ':' + Secret)
            },
            body: JSON.stringify(req.body)
        }
        fetch(url, config).then(response => {
            res.sendStatus(response.status);
        });
    }
    catch(e) {
        res.sendStatus(500);
    }
});
