<?php
include("./../connection.php");
$numberOfResultsPerPage = 9;
$currentPage = getCurrentPage();
$initialLimit = getPaginationConfig($numberOfResultsPerPage, $currentPage);
$amountOfPages = getAmountOfPagesToCreatePager("Personal_Information", $numberOfResultsPerPage);
$sql = " CALL 1SHOW_PATIENT_TABLE(?,?)";
$typeOfParameters = "ii";
$parameters = array($initialLimit, $numberOfResultsPerPage);
$result = executePreparedStatement($sql, $typeOfParameters, $parameters);
$data =  getResultOfPreparedStatement($result);
sendJson($data, $msg, null, $amountOfPages, $currentPage);
