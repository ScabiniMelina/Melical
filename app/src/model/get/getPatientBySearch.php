<?php
include("./../connection.php");
$numberOfResultsPerPage = 9;
$currentPage = getCurrentPage();
$initialLimit = getPaginationConfig($numberOfResultsPerPage, $currentPage);
$sql = "SELECT ID_DNI AS ID, dni, name, surname, date_birth AS dateBirth FROM Personal_Information ";
$condition = " WHERE ";
$id = $_GET['id'];
if (isset($id)) {
    if (is_numeric($id)) {
        $condition .= "  dni = ?";
        $typeOfParameters = "i";
        $parameters = array("%$id%");
    } else {
        $condition .= " name LIKE ? OR surname LIKE ?";
        $typeOfParameters = "ss";
        $parameters = array("%$id%", "%$id%");
    }
}
$amountOfPages = getAmountOfPagesToCreatePager("Personal_Information" . $condition, $numberOfResultsPerPage, $typeOfParameters, $parameters);
$typeOfParameters .= "ii";
array_push($parameters, $initialLimit, $numberOfResultsPerPage);
$result = executePreparedStatement($sql . $condition . " LIMIT ?,? ", $typeOfParameters, $parameters);
$data = getResultOfPreparedStatement($result);
sendJson($data, $msg, null, $amountOfPages, $currentPage);
