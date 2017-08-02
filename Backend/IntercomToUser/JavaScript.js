//This snippet requires a PageAccessToken
//To get a PageAccessToken you can use a function like set up in the 'CreatePageAccessToken' snippet
var PageAccessToken = GetPageAccessToken(chayns.env.site.tapp.id, function (res) { return res; });

var Server = 'https://api.chayns.net/v2.0';
function SendIntercom(message, users, groups, locations, groupChat) {
    var config = {
        url: Server + '/' + chayns.env.site.locationId + '/Intercom',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + PageAccessToken
        },
        body: JSON.stringify({
            'Message': message,
            'UserIds': users,
            'UacIds': groups,
            'ReceiverLocationIds': locations,
            'UseGroupChat': groupChat
        }),
        method: 'POST'
    };
    fetch(config.url, config)
        .then(function(response) {
            response.json()
                .then(function (data) {
                    console.log(data);
                });
        });
}
