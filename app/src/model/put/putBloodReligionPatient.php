<?php
  include("./../connection.php");
  $_PUT = getPutRequestParameters();
  $patientId = $_PUT['id']; 
  $religion = setSelectValue($_PUT['religion']);
  $blood = setSelectValue($_PUT['blood']);
  $sql = "UPDATE `PATIENT` SET `PK_ID_BLOOD_TYPE` = ?,`PK_ID_RELIGION` = ? WHERE `ID_PATIENT` = ? ";
  $typeOfParameters = "iis";
  $parameters = array($blood,$religion,$patientId);  
  $result = getPreparedStatement($sql,$typeOfParameters, $parameters);
  sendJson(null,$msg, null,null,null);
  // $id_dni = mysqli_insert_id($connection);
