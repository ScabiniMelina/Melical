<?php
include("./../connection.php");
$numberOfResultsPerPage = 9;
$currentPage = getCurrentPage();
$initialLimit = getPaginationConfig($numberOfResultsPerPage, $currentPage);
$id = $_GET["id"];
$sql = "SELECT ID_DNI AS ID,ID_DNI AS oldId, dni, name, surname, date_birth AS dateBirth FROM Personal_Information ";
$condition = " WHERE ";
if (isset($id)) {
    $parameters =  array($id);
    if (is_numeric($id)) {
        $condition .= " dni LIKE ?";
        $typeOfParameters = "s";
        //$var="%$id%";
        $parameters = array("%$id%");
    } else {
        $condition .= " name LIKE ? OR surname LIKE ?";
        $typeOfParameters = "ss";
        $parameters = array("%$id%", "%$id%");
    }
}

$result = executePreparedStatement($sql, $typeOfParameters, $parameters);
$data = getResultOfPreparedStatement($result);
$amountOfPages = getAmountOfPagesToCreatePager("Personal_Information" . $condition, $numberOfResultsPerPage, $typeOfParameters, $parameters);
$typeOfParameters .= "ii";
array_push($parameters, $initialLimit, $numberOfResultsPerPage);
$result = executePreparedStatement($sql . $condition . " LIMIT ?,? ", $typeOfParameters, $parameters);
$data = getResultOfPreparedStatement($result);
sendJson($data, $msg, null, $amountOfPages, $currentPage);

// sendJson($data, $msg, null, null, null);
