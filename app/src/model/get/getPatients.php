<?php
include("./../connection.php");
$numberOfResultsPerPage = 10;
$currentPage = getCurrentPage();
$initialLimit = getPaginationConfig($numberOfResultsPerPage,$currentPage);
$amountOfPages = getAmountOfPagesToCreatePager("PERSONAL_INFORMATION",$numberOfResultsPerPage);
$sql = "SELECT ID_DNI AS ID, dni, name, surname, date_birth AS dateBirth  FROM PERSONAL_INFORMATION LIMIT ?,?";
$typeOfParameters = "ii";
$parameters = array($initialLimit,$numberOfResultsPerPage);
$result= getPreparedStatement($sql,$typeOfParameters,$parameters);
$data =  getResultOfPreparedStatement($result);
sendJson($data,$msg,null, $amountOfPages,$currentPage);

