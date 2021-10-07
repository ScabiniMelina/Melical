<?php
include("./../connection.php");
$id = $_GET["id"];
$sql = "SELECT  `ID_PATIENT`,`PK_ID_BLOOD_TYPE`AS blood ,`PK_ID_RELIGION` AS  religion FROM  `PATIENT` WHERE `PK_ID_DNI` = ? ";
$parameters =  array($id);
$typeOfParameters = "s";
$result = getPreparedStatement($sql,$typeOfParameters, $parameters);
$data = getResultOfPreparedStatement($result);
$id = $data[0]['ID_PATIENT'];
sendJson($data, $msg, $id, null,null);

