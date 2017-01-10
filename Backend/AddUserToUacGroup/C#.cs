import RestSharp;

public string Server = "https://api.chayns.net/v2.0";
private const string Secret = "Your Tapp Secret";

[HttpPost]
[Route("UserPermitted")]
public IHttpActionResult UserPermitted(int locationId, int tappId, int userId, int groupId)
{
    try
    {
        //Test if the user exists in the Group
        dynamic user = AddUserToUacGroup(locationId, tappId, userId, groupId);

        //null means add failed
        if (user == null)
        {
            return InternalServerError();
        }
        else
        {
            //Build user-model
            object userModel = new
            {
                userId = user.userId,
                firstName = user.firstName,
                lastName = user.lastName,
                name = user.firstName,
                gender = user.gender
            };
            return Ok(userModel);
        }

    }
    catch (Exception exception)
    {
        return InternalServerError(exception);
    }
}

public dynamic AddUserToUacGroup(int locationId, int tappId, int userId, int groupId)
{
    //Set up RestSharp
    RestClient restClient = new RestClient(Server);

    //Build the request
    RestRequest req = new RestRequest("/" + locationId + "/Uac/" + groupId + "/User/" + userId);
    req.Method = Method.POST;
    req.AddHeader("Content-Type", "application/json");
    req.AddHeader("Authorization", "Basic " + Convert.ToBase64String(Encoding.UTF8.GetBytes(Convert.ToString(tappId) + ':' + Secret)));

    //Run the request
    IRestResponse resp = restClient.Execute(req);

    //Test response health
    if (resp.StatusCode == HttpStatusCode.Created)
    {
        //Parse data
        dynamic data = JObject.Parse(resp.Content);
        //Just return the user-Model
        return data.data[0];
    }
    return null;
}
