import RestSharp;

public class MailDto
{
    public string Headline { get; set; }
    public string Text { get; set; }
    public string Greeting { get; set; }
    public string Subject { get; set; }
    public List<int> UacIds { get; set; }
    public List<int> UserIds { get; set; }
}

public string Server = "https://api.chayns.net/v2.0/";
private const string Secret = "Your Tapp Secret";

public IHttpActionResult post(int locationId, int tappId, [FromBody]MailDto body)
{
    try
    {
        RestClient restClient = new RestClient(Server);
        RestRequest req = new RestRequest(locationId + "/Email");
        req.Method = Method.POST;
        req.AddHeader("Content-Type", "application/json");
        req.AddHeader("Authorization", "Basic " + Convert.ToBase64String(Encoding.UTF8.GetBytes(Convert.ToString(tappId) + ":" + Secret)));

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
