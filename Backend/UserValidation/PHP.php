<?php
define('Server', 'https://api.chayns.net/v2.0/'.$_GET['LocationID']);
//Get the Parameter from body
$user = GetUser($_POST['accessToken']);
if($user != null) {
  //Return the user
  echo json_encode($user);
}
else {
  //Can't find the user, so he's Unauthorized
  http_response_code(401);
}
function GetUser($accessToken) {
  //Build the request
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL,Server.'/AccessToken');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $headers = array();
  $headers[] = 'Authorization:Bearer '.$accessToken;
  $headers[] = 'Content-Type:application/json';
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
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
