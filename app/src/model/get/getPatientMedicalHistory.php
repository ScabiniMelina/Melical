<?php
include("./../connection.php");

// se requiere previamente un dataform enviado con el metodo get que contenga  ['numberOfCardsLoads']
//TODO: REVIZAR LAZY LAOD
$numberOfCardLoads = setValue(0, $_GET['numberOfCardsLoads']);
$numberOfItemsToShow  = setValue(6, $_GET['numberOfItemsToShow']);
$initialRow = $numberOfCardLoads * $numberOfItemsToShow;
$sql = "SELECT X LIMIT ?,?";
$typeOfParameters = "ii";
$parameters = array($initialRow, $numberOfItemsToShow);
$result = executePreparedStatement($sql, $typeOfParameters, $parameters);
$data =  getResultOfPreparedStatement($result);
sendJson($data, $msg, null, null, null);
