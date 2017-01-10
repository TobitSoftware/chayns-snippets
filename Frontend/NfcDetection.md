# NFC Detection

This sample allows you to perform an action with a detected rfid card. Use the button to toggle the detection.<br>
<b>Only supported on Android app.</b>

### HTML
```
<div>
  <input type='checkbox'  class='switch'  id='switch'>
  <label for='switch' onClick='detection();'  data-on='1'  data-off='0'></label> 
  
  <p id='showRFID'>
  </p>
</div>
```

### JavaScript
```
function detection() {
 if (chayns.env.isAndroid && chayns.env.isApp) {
  var checked = document.querySelector('#switch')
            .checked;
  if (!checked) {
   startDetection();
  } else {
   stopDetection();
  }
 } else {
 chayns.dialog.alert('', 'Only supported on Android app.');
 setTimeout(function () {
  document.querySelector('#switch').checked = false;
 }, 0);   
  
 }
}

function startDetection() { 
 chayns.showWaitCursor();
 chayns.startNfcDetection(function 
 (data) { 
  if (data.connected) {
   stopDetection();
   document.querySelector('#showRFID').textContent = 
   'RFID: ' + data.rfid;
  }
 }, 100, false);
}

function stopDetection() {
  chayns.hideWaitCursor();
  chayns.stopNfcDetection();
  document.querySelector('#switch').checked = false;
}
 ```
