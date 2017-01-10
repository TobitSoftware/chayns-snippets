import RestSharp;

public string Server = "https://api.chayns.net/v2.0";
private const string Secret = "Your Tapp Secret";

[HttpPost]
[Route("GetUserFromRFID")]
public IHttpActionResult GetUserFromRFID(int locationId, int tappId, string rfidData)
{
    try
    {
        //Get the userdata
        dynamic user = GetUserByRFID(locationId, tappId, rfidData);
        if (user != null)
        {
            //Build the return-model from the userdata
            object userData = new
            {
                countGroups=user.countGroups,
                firstName=user.firstName,
                lastName=user.lastName,
                name=user.name,
                personId=user.personId,
                userId=user.userId
            };
            return Ok(userData);
        }
        else
        {
            //We cant find an user.
            return NotFound();
        }
    }
    catch (Exception exception)
    {
        return InternalServerError(exception);
    }
}

public dynamic GetUserByRFID(int loacationId, int tappId, string RfidData)
{
    //Set up RestSharp
    RestClient restClient = new RestClient(Server);

    //Build the request
    RestRequest req = new RestRequest("/" + loacationId + "/User?rfid=" + RfidData);
    req.Method = Method.GET;
    req.AddHeader("Content-Type", "application/json");
    req.AddHeader("Authorization", "Basic" + Convert.ToBase64String(Encoding.UTF8.GetBytes(Convert.ToString(tappId) + ':' + Secret)));

    //Run the request
    IRestResponse resp = restClient.Execute(req);

    //Check response health
    if (resp.StatusCode == HttpStatusCode.OK)
    {
        //Parse the data
        dynamic data = JObject.Parse(resp.Content);
        //Just return the user-model
        return data.data[0];
    }

    //Return null if the request went wrong
    return null;
}
