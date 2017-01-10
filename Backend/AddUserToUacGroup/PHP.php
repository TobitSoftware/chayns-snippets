<?php
define('Server', 'https://api.chayns.net/v2.0');
define('Secret', 'Your Tapp Secret');

//Get the Parameter from body
$user = AddUserToUacGroup($_GET['locationId'],
$_GET['tappId'], $_GET['userId'], $_GET['groupId']);
if($user != null) {

  //Return the user
  echo json_encode($user);
}
else {

  //Can't add the user to the group
  http_response_code(409);
}

function AddUserToUacGroup($locationId, $tappId, $userId, $groupId) {

  //Build the request
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL,Server.'/'.$locationId.'/Uac/'.$groupId.'/User/'.$userId);

  $headers = array();
  $headers[] = 'Authorization:Basic '.base64Encode($tappId.':'.Secret);
  $headers[] = 'Content-Type:application/json';
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(''));

  //Run the request
  $result = curl_exec ($ch);

  //Test for errors
  if(curl_error($ch) !== '') {
    return null;
  }
  curl_close ($ch);

  //Format data
  $data = json_decode($result, true);

  //Check data health
  if(isset($data['data'])) {
    if(isset($data['data'][0])) {

      //Just return the user
      return $data['data'][0];
    }
    else {

      //Missing informaion
      return null;
    }
  }
  else {

    //Missing informaion
    return null;
  }
}
?>
