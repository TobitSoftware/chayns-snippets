var Server = 'https://api.chayns.net/v2.0/' + chayns.env.site.locationId;

function ValidateUser(accessToken, success, error) {
  //Build the request
  var config = {
    url: Server + '/AccessToken',
    config: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
  };
  fetch(config.url, config.config)
  .then(function(response) {
    //Build response
    response.json().then(function(data) {
      //Test response health
      if (response.ok) {
        //Run the success callback and parse the user model
        success(data.data[0]);
      }
      else {
        //Run the error callback and parse the requst data
        error(response);
      }
    });
  });
};
