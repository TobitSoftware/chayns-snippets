public string Server = "https://api.chayns.net/v2.0/";

[HttpPost]
[Route("ValidateUser")]
public IHttpActionResult ValidateUser([FromBody] string accessToken, [FromBody] int locationId, int tappId)
{
    try
    {
        //Get the userdata
        dynamic user = GetUser(accessToken, locationId, tappId);
        if (user != null)
        {
            //Build the return-model from the userdata
            object userData = new
            {
                Exprire = user.expires,
                FacebookUserID = user.facebookUserId,
                FirstName = user.firstName,
                LastName = user.lastName,
                LocationID = user.locationId,
                Permissions = user.permissions,
                PersonID = user.personId,
                TokenTypeID = user.tokenType.type,
                TokenTypeName = user.tokenType.name,
                UserID = user.userId
            };
            return Ok(userData);
        }
        else
        {
            //Can't find an user.
            return Unauthorized();
        }
    }
    catch (Exception exception)
    {
        return InternalServerError(exception);
    }
}

public dynamic GetUser(string accessToken, int locationId, int tappId)
{
    //Set up RestSharp
    RestClient restClient = new RestClient(Server);

    //Build the request
    RestRequest req = new RestRequest("/" + locationId + "/AccessToken");
    req.Method = Method.GET;
    req.AddHeader("Content-Type", "application/json");
    req.AddHeader("Authorization", "Basic" + Convert.ToBase64String(Encoding.UTF8.GetBytes(Convert.ToString(tappId) + ':' + Secret)));

    //Run the request
    IRestResponse resp = restClient.Execute(req);

    //Test response health
    if (resp.StatusCode == HttpStatusCode.OK)
    {
        //Parse data with Newtonsoft.Json.Linq
        dynamic data = JObject.Parse(resp.Content);
        //Just return the user-model
        return data.data[0];
    }

    //Return null if the request went wrong
    return null;
}
