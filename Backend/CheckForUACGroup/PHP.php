<?php

define('Server', 'https://api.chayns.net/v2.0');
define('Secret', 'Your Tapp Secret');
define('MangerUacGroup', '1');

$user = IsUserInGroup($_GET['locationId'], $_GET['tappId'], $_GET['userId'], MangerUacGroup);
if($user != null) {

  //Return the user
  echo json_encode($user);
}
else {

  //Can't find the user, so he's Unauthorized
  http_response_code(401);
}

function IsUserInGroup($locationId, $tappId, $userId, $groupId) {

  //Build the request
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL,Server.'/'.$locationId.'/Uac/'.$groupId.'/User/'.$userId);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  $headers = array();
  $headers[] = 'Authorization:Basic '.base64_encode($tappId.':'.Secret);
  $headers[] = 'Content-Type:application/json';
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

  //Run the request
  $result = curl_exec ($ch);

  //Test for errors
  if(curl_error($ch) !== '') {
    echo curl_error($ch);
    exit(1);
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
