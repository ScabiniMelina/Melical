<?php
  include("./../connection.php");
  $dni = $_POST['dni']; 
  $cuil = $_POST['tramitNumber'];
  $name = $_POST['name'];
  $surname = $_POST['surname'];
  $dateBirth = $_POST['dateBirth'];
  $gender =  $_POST['gender'] ;
  $phone = $_POST['phone'];
  $email = $_POST['email'];
  $address = $_POST['address'];
  $addressNumber = $_POST['addressNumber'];
  $location = $_POST['location'];
  $id = getMd5Id("PERSONAL_INFORMATION", "ID_DNI");

  if ( strcmp($location, "default" ) == 0 ) {
    $location = null;
  }

  if ( strcmp($gender, "default" ) == 0 ){
    $gender = null;
  }
 $sql = "INSERT INTO `PERSONAL_INFORMATION`( `ID_DNI`,`dni`,`tramit_nume`,`name`,`surname`,`gender`,`date_Birth`,`phone`,`email`,`address`,`address_number`,`PK_ID_LOCATION`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
  $typeOfParameters = "siissssissii";
  $parameters = array( $id,$dni,$cuil,$name,$surname,$gender,$dateBirth,$phone,$email,$address,$addressNumber,$location);  
  $result = getPreparedStatement($sql,$typeOfParameters, $parameters);
  sendJson(null,$msg,$id,null);
