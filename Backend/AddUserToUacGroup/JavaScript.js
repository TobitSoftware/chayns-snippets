//This snippet requires a PageAccessToken
//To get a PageAccessToken you can use a function like set up in the 'CreatePageAccessToken' snippet
var PageAccessToken = GetPageAccessToken(); 

var Server = 'https://api.chayns.net/v2.0';
function SendMessage(message, users, groups, locations,      groupChat) {
    var config = {
        url: Server + '/' + chayns.env.site.locationId + '/Intercom', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + PageAccessToken
        },
        body: {
            'Message': message,
            'UacIds': groups,
            'UserIds': users,
            'ReceiverLocationIds': locations,
            'UseGroupChat': groupChat
        },
        method: 'POST'
    };
    fetch(config.url, config)
        .then(function(response) {
            response.json()
                .then(function (data) {
                    if (response.status === 201) {
                        success(data.data[0]);
                    } else {
                        error(response);
                    }
                });
        });
}
