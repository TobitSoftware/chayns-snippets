# Check if an user is in a specified UAC group

This sample allows you to check, if an user is in a specified UAC group.

### HTML
```
<div>
  <button class='button' onClick='isUserInUacGroup(1);'>
    Check
  </button>
</div>
```

### JavaScript
```
function isUserInUacGroup(groupId) {
for (var i = 0, j = chayns.env.user.groups; i < j.length; i++) {
 if (j[i].id === groupId) {
  chayns.dialog.alert('', 'You're in the specified Uac Group ' + j[i].name + '.');
  break;
 }
 if (i === j.length - 1) {
  chayns.dialog.alert('', 'You're not in the specified Uac Group.');
 }
}
}
 ```
