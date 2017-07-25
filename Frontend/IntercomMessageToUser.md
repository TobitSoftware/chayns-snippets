# Send intercom message from User to User

At first it will be checked, if the user is logged in. <br>
The UserId of the user can be found, like in this example, by the person finder.

### HTML
```
<div>
  <input class='input' type='text' id='i1' style='width: 100%; margin-bottom: 5px;' placeholder='message' />
  
  <input id='i2'  type='text'  class='input'  finder='person'  placeholder='name'  style='width: 100%; margin-bottom: 5px;' />
  
  <div style='text-align: center'>
    
    <button class='button' onClick='toUser();'>
      Send Message
    </button>
      
  </div>
</div>
```

### JavaScript
```
var user;
document.querySelector('#i2').addEventListener('finderChange', 
  function (data) { 
    chayns.getUser({
      'personId': data.user.personId
    }).then(function(result) {
      user = result.UserID;
    });
});

function toUser() {
  if (chayns.env.user.isAuthenticated) { 
    var message = document.querySelector('#i1').value;
    if (user && message) {
      chayns.intercom.sendMessageToUser(user, { text: message }).then(function (result) {
	if (result.ok) {
	  chayns.dialog.alert('', 'Your message was send');
	} else {
	  chayns.dialog.alert('', 'An error occured');
	}
      });
    }
  } else {
    chayns.dialog.alert('Login missing', 'To send a message, you have to login.');
  }
}
 ```
