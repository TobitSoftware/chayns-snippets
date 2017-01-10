<?php 
define('Server', 'https://api.chayns.net/v2.0');
define('Secret', 'Your Tapp Secret');

//Get the Parameter from body
$group = CreateUacGroup($_GET['locationId'], $_GET['tappId'], $_GET['name'], $_GET['showName']);
if($group != null) {

  //Return the user
  echo json_encode($group);
}
else {

  //Can't create the group
  http_response_code(409);
}

function CreateUacGroup($locationId, $tappId, $name, $showName) {

  //Build the request
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL,Server.'/'.$locationId.'/Uac');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  $headers = array();
  $headers[] = 'Authorization:Basic '.base64_encode($tappId.':'.Secret);
  $headers[] = 'Content-Type:application/json';
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

  $body['showname'] = $showName;
  $body['name'] = $name;
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));

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

      //Just return the group
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
