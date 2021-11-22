<?php
include("./../connection.php");
$id = $_GET["id"];
$sql = "SELECT `ID_PATIENT`,`PK_Blood`AS blood ,`PK_Religion` AS religion FROM `Patient` WHERE `PK_Dni` = ? ";
$parameters =  array($id);
$typeOfParameters = "s";
$result = executePreparedStatement($sql, $typeOfParameters, $parameters);
$data = getResultOfPreparedStatement($result);
$id = $data[0]['ID_PATIENT'];
sendJson($data, $msg, $id, null, null);
