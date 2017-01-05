# Send intercom message from User to Page

This sample allows an user to send a intercom message to the current page. 
In the chayns.ready promise it will be checked, if the user is logged in, because a login is required.

### HTML
```
<div>
  <input class='input' type='text' id='i1' style='width: 100%; margin-bottom: 5px;' placeholder='message' />
  
  <div style='text-align: center'>
  
    <button class='button' onClick='toPage();'>
      From User To Page
    </button>
      
  </div>
</div>
```

### JavaScript
```
function toPage() {
 if (chayns.env.user.isAuthenticated) { 
  var message = 
  document.querySelector('#i1').value;
  chayns.intercom.sendMessageToPage(
   { 
    text: message
   }
  ).then(function (result) {
   if (result.ok) {
    chayns.dialog.alert('', 'Your message was send');
   } else {
    chayns.dialog.alert('', 'An error occured');
   }
  });
 } else {
	chayns.dialog.alert('Login missing', 'To send a message, you have to login.');
 }
}
 ```
