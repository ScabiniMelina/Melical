<?php
include("./../connection.php");
if (!isset($_POST['id'])) {
  $msg['type'] = 'error';
  $msg['text'] = 'Debe guardar la información general del paciente primero';
  sendJson(null, $msg, null, null, null);
  exit();
}
$personalInformationId = $_POST['id'];
$id =  getMd5Id('Patient', 'ID_PATIENT');
$religion = setSelectValue($_POST['religion']);
$blood = setSelectValue($_POST['blood']);
$sql = "INSERT INTO `Patient`( `ID_PATIENT`,`PK_Dni`,`PK_Blood`,`PK_Religion`) VALUES (?,?,?,?)";
$typeOfParameters = "ssii";
$parameters = array($id, $personalInformationId, $blood, $religion);
$result = executePreparedStatement($sql, $typeOfParameters, $parameters);
sendJson(null, $msg, $id, null, null);
