<?php
include("./../connection.php");
//TODO: CAMBIAR EL SQL Y HACER QUE EL NOMBRE DE LA COLUMNA COINCIDA CON LA CLASE QUE ESTA EN EL ELEMENTO DEL TEMPLATE
$numberOfCardLoads = setValue(0, $_GET['numberOfCardsLoads']);
$numberOfItemsToShow  = setValue(6, $_GET['numberOfItemsToShow']);
$initialRow = $numberOfCardLoads * $numberOfItemsToShow;
$sql = "SELECT ID_DNI AS provenance, DNI AS reasonForAdmission, name as hospital,date_birth AS date, dni as id FROM `Personal_Information` LIMIT ?,?";
$typeOfParameters = "ii";
$parameters = array($initialRow, $numberOfItemsToShow);
$result = executePreparedStatement($sql, $typeOfParameters, $parameters);
$data =  getResultOfPreparedStatement($result);
sendJson($data, $msg, null, null, null);
