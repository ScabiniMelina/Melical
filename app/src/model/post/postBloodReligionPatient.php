<?php
include("./../connection.php");
if (!isset($_POST['id'])) {
  $msg['type'] = 'error';
  $msg['text'] = 'Debe guardar la información general del paciente primero';
  sendJson(null, $msg, null, null, null);
  exit();
}
$personalInformationId = $_POST['id'];
$id =  getMd5Id('PATIENT', 'ID_PATIENT');
$religion = setSelectValue($_POST['religion']);
$blood = setSelectValue($_POST['blood']);
$sql = "INSERT INTO `PATIENT`( `ID_PATIENT`,`PK_ID_DNI`,`PK_ID_BLOOD_TYPE`,`PK_ID_RELIGION`) VALUES (?,?,?,?)";
$typeOfParameters = "ssii";
$parameters = array($id, $personalInformationId, $blood, $religion);
$result = executePreparedStatement($sql, $typeOfParameters, $parameters);
sendJson(null, $msg, $id, null, null);
