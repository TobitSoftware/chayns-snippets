<?php
define('Server', 'https://api.chayns.net/v2.0');
define('Secret', 'Your Tapp Secret');

//Get the Parameter from body
$user = GetUserFromQR($_GET['locationId'], $_GET['tappId'], $_GET['QrData']);
if($user != null) {

  //Return the user
  echo json_encode($user);
}
else {

  //Can't find the user
  http_response_code(404);
}

function GetUserFromQR($locationId, $tappId, $qrData) {

  //Build the request
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL,Server.'/'.$locationId.'/User?qrcode='.$qrData);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  $headers = array();
  $headers[] = 'Authorization:Basic '.base64_encode($tappId.':'.Secret);
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
