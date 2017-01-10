import RestSharp;

public string Server = "https://api.chayns.net/v2.0";
private const string Secret = "Your Tapp Secret";
public const int MangerUacGroup = 1;

[HttpPost]
[Route("CreateUac")]
public IHttpActionResult CreateUac(int locationId, int tappId, string name, string showName)
{
    try
    {
        //Create the UAC-group
        dynamic group = 
              CreateUacGroup(locationId, tappId, name, showName);

        //null means creation failed
        if (group == null)
        {
            return InternalServerError();
        }
        else
        {
            //Build group-model
            object groupModel = new
            {
                userGroupId=group.userGroupId,
                tappId=group.tappId,
                countMember = group.countMember,
                showName =group.showName,
                name =group.name
            };
            return Ok(groupModel);
        }

    }
    catch (Exception exception)
    {
        return InternalServerError(exception);
    }
}

public dynamic CreateUacGroup(int locationId, int tappId, string name, string showName)
{
    //Set up RestSharp
    RestClient restClient = new RestClient(Server);

    //Build the request
    RestRequest req = new RestRequest("/" + locationId + "/Uac");
    req.Method = Method.POST;
    req.AddHeader("Content-Type", "application/json");
    req.AddHeader("Authorization", "Basic " + Convert.ToBase64String(Encoding.UTF8.GetBytes(Convert.ToString(tappId) + ':' + Secret)));

    req.RequestFormat = DataFormat.Json;
    req.AddBody(new { showname = showName, name = name });

    //Run the request
    IRestResponse resp = restClient.Execute(req);

    //Test response health
    if (resp.StatusCode == HttpStatusCode.Created)
    {
        //Parse data
        dynamic data = JObject.Parse(resp.Content);
        //Just return the group-model
        return data.data[0];
    }
    //Return null if the request went wrong
    return null;
}
