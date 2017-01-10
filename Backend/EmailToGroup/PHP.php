<?php
define('Server', 'https://api.chayns.net/v2.0');
define('Secret', 'Your tapp secret');

//Get the request body
$body = file_get_contents('php://input');
 
$response = SendMailToGroup($_GET['locationId'], $_GET['tappId'], $body);
echo json_encode($response);

function SendMailToGroup($locationId, $tappId, $body) {

  //Build the request
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL,Server.'/'.$locationId.'/Email/');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  $headers = array();
  $headers[] = 'Authorization:Basic '.base64_encode($tappId.':'.Secret);
  $headers[] = 'Content-Type:application/json';
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $body);

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
  
  return $data;
}
?>
