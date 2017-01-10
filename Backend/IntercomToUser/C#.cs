import RestSharp;

public class IntercomDto
{
    public string Message { get; set; }
    public List<int> UacIds { get; set; }
    public List<int> UserIds { get; set; }
    public List<int> ReceiverLocationIds { get; set; }
    public bool? UseGroupChat { get; set; }
}

string Server = "https://api.chayns.net/v2.0/";
string Secret = "Your tapp secret";

public IHttpActionResult Post(int locationId, int tappId, [FromBody]IntercomDto body)
{
    try
    {
        RestClient restClient = new RestClient(Server);
        RestRequest req = new RestRequest(locationId + "/Intercom");
        req.Method = Method.POST;
        req.AddHeader("Content-Type", "application/json");
        req.AddHeader("Authorization",
            "Basic " + Convert.ToBase64String(Encoding.UTF8.GetBytes(Convert.ToString(tappId) + ':' + Secret)));

        req.RequestFormat = DataFormat.Json;
        req.AddBody(body);

        IRestResponse resp = restClient.Execute(req);

        if (resp.StatusCode == HttpStatusCode.OK)
        {
            return Ok(JObject.Parse(resp.Content));
        }
        else
        {
            return Conflict();
        }
    }
    catch (Exception e)
    {
        return InternalServerError(e);
    }
}
