var PageAccessToken = GetPageAccessToken(chayns.env.site.tapp.id, function (res) { return res; });

var Server = 'https://api.chayns.net/v2.0';
function SendMails(Headline, Text, Greeting, Subject, UacIds, UserIds) {
    var config = {
        url: Server + '/' + chayns.env.site.locationId + '/Email', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + PageAccessToken
        },
        body: JSON.stringify({
            'UacIds': UacIds,
            'UserIds': UserIds,
            'Headline': Headline,
            'Text': Text,
            'Greeting': Greeting,
            'Subject': Subject
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
