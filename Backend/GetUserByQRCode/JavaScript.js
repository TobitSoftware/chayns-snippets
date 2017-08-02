//This snippet requires a PageAccessToken
//To get a PageAccessToken you can use a function like set up in the 'CreatePageAccessToken' snippet
var PageAccessToken = GetPageAccessToken(); 

var Server = 'https://api.chayns.net/v2.0';
function GetUserByQR(QrData, success, error) {
    var config = {
        url: Server + '/' + chayns.env.site.locationId + '/User?qrcode=' + QrData,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + PageAccessToken
        }
    };
    fetch(config.url, config)
        .then(function(response) {
            response.json()
                .then(function (data) {
                    if (response.ok) {
                        success(data.data[0]);
                    } else {
                        error(response);
                    }
                });
        });
}
