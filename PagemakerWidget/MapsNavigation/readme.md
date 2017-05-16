# Google Maps Navigation
This widget embeds a google maps excerpt pointing at the adress you provide.<br>
Depending on the accuracy of the adress this widget offers your users the possibility to run the maps navigation directly from your tapp.

Provide the adress as url parameter to the iframe like in this example
```JavaScript
var iframeSrc = "https://url-to-your-server.com/Widget/MapsNavigation?destination=Tobit.Campus,Ahaus,Germany";
```
The provided destination is very dynamic since it does not require to get all the country, city or point of interest at once. Already parts of the adress could work.