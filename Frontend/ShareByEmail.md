# Share by eMail

This sample allows you to share a text via E-Mail.<br>
<b>Only supported on smartphone apps.</b>

### HTML
```
<div>
  <input class='input' type='text' id='title' style='width: 100%; margin-bottom: 5px;' placeholder='title' />
  
  <input class='input' type='text' id='text' style='width: 100%; margin-bottom: 5px;' placeholder='text' />
  
  <div style='text-align: center'>
    <button class='button' onClick='share();'>
      Share
    </button>
  </div>
  
</div>
```

### JavaScript
```
function getSharingService() {
var sharingApp;
if (chayns.env.isApp) {
  chayns.getAvailableSharingServices()
  .then(function (result) {
	   sharingApp = result.retVal.availableSharingApps[0];
	   return sharingApp;
	  });
	} else {
	 chayns.dialog.alert('', 'Sharing only supported on smartphone apps.');
	 return sharingApp;
	}
}

function share() {
 var sharingApp = getSharingService();
 if (sharingApp) {
 var title = document.querySelector('#title').value;
 var text = document.querySelector('#text').value;
  chayns.share({
   title: title,
   text: text,
   sharingApp: sharingApp
  }).then(function (result) {
   if (result.ok) {
    chayns.dialog.alert('', 'Your text was shared');
   } else {
    chayns.dialog.alert('', 'An error occured');
   }
  });
 }
}
 ```
