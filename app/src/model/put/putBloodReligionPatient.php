<?php
include("./../connection.php");
$_PUT = getPutRequestParameters();
$patientId = $_PUT['id'];
$religion = setSelectValue($_PUT['religion']);
$blood = setSelectValue($_PUT['blood']);
$sql = "UPDATE `Patient` SET `PK_Blood` = ?,`PK_Religion` = ? WHERE `ID_PATIENT` = ? ";
$typeOfParameters = "iis";
$parameters = array($blood, $religion, $patientId);
$result = executePreparedStatement($sql, $typeOfParameters, $parameters);
sendJson(null, $msg, null, null, null);
  // $id_dni = mysqli_insert_id($connection);
