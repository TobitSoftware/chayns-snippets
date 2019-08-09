# Login

This sample implements a simple login button. 
It suppports 3 cases
* If the user is logged in, the login button isn't visible
* If the user isn't logged in, the login button is visible
* If the user has logged in using the button, a message saying 'Thank you for logging in.' is shown

### HTML
```html
<div>
  <button class="button hidden" id="loginButton" onClick="login();">
    Login
  </button>

  <p id="loginMessage" class="hidden">
    Thank you for logging in.
  </p>
</div>
```

### CSS
```css
.hidden {
  display: none;                   
}
```

### JavaScript 
```javascript
chayns.ready.then(function () {
  checkForLogin();                                 
});

function checkForLogin() {
  if (!chayns.env.user.isAuthenticated) {
    document.querySelector('#loginButton').classList.remove('hidden');
  } else {
    if (chayns.env.parameters.login) {
      document.querySelector('#loginMessage').classList.remove('hidden');
    }
  }
}

function login() {
  //optional -> prevents site reload
  chayns.addAccessTokenChangeListener(true, function() {   
    console.log('login successful');        
  });

  //reloads tapp after login
  chayns.login(['login=true']);
 }
 ```
