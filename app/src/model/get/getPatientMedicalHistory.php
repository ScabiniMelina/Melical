<?php
//TODO: CAMBIAR EL SQL Y HACER QUE EL NOMBRE DE LA COLUMNA COINCIDA CON LA CLASE QUE ESTA EN EL ELEMENTO DEL TEMPLATE
include("./../connection.php");
$numberOfCardLoads = setValue(0, $_GET['numberOfCardsLoads']);
$numberOfItemsToShow  = setValue(6, $_GET['numberOfItemsToShow']);
$personalInformationId = $_GET['id'];
$$initialRow = $numberOfCardLoads * $numberOfItemsToShow;
$sql = "SELECT ID_DNI AS provenance, DNI AS reasonForAdmission, name as hospital,date_birth AS date, cuil as id , ID_DNI  as oldId FROM `Personal_Information` WHERE ID_DNI = ? LIMIT ?,?";
$typeOfParameters = "sii";
$parameters = array($personalInformationId, $initialRow, $numberOfItemsToShow);
$result = executePreparedStatement($sql, $typeOfParameters, $parameters);
$data =  getResultOfPreparedStatement($result);
sendJson($data, $msg, null, null, null);
