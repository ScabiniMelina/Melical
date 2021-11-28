<?php
session_start();
include("./../connection.php");
$numberOfResultsPerPage = 2;
$currentPage = getCurrentPage();
$initialLimit = getPaginationConfig($numberOfResultsPerPage, $currentPage);
$parameters = array($_SESSION['ID_HOSPITAL']);
$typeOfParameters = "i";
$studyName =  setSelectValue($_GET['studyName']);
$status =  setSelectValue($_GET['status']);
$dateMade =  setSelectValue($_GET['dateMade']);
$cuil =  setSelectValue($_GET['cuil']);
$condition =  " ";
if (isset($studyName)) {
    $condition .= " AND Type.ID_TYPE = ? ";
    array_push($parameters, $studyName);
    $typeOfParameters .= "i";
}
if (isset($status)) {
    $condition .= "AND  Study_Detail.stage = ? ";
    array_push($parameters, $status);
    $typeOfParameters .= "i";
}
if (isset($dateMade)) {
    $condition .= " AND Study_Detail.date_made > ? ";
    array_push($parameters, $dateMade);
    $typeOfParameters .= "s";
}
if (isset($cuil)) {
    $condition .= " AND Personal_Information.cuil = ? ";
    array_push($parameters, $cuil);
    $typeOfParameters .= "i";
}
$sql2 = "Personal_Information INNER JOIN Patient ON Patient.PK_Dni=Personal_Information.ID_DNI INNER JOIN Medical_Care ON Medical_Care.PK_Patient=Patient.ID_PATIENT INNER JOIN Sector_Patient ON Sector_Patient.PK_MC=Medical_Care.ID_MC INNER JOIN Sector_Hospital ON Sector_Patient.PK_SH=Sector_Hospital.ID_SH INNER JOIN Study_Detail ON Study_Detail.PK_MC=Medical_Care.ID_MC INNER JOIN Type ON Type.ID_TYPE=Study_Detail.PK_TYPE WHERE Sector_Hospital.PK_Hospital= ? ";
$amountOfPages = getAmountOfPagesToCreatePager($sql2 . $condition . " GROUP BY Study_Detail.ID_SD", $numberOfResultsPerPage, $typeOfParameters, $parameters);
$sql = "SELECT  `Study_Detail`.ID_SD AS ID,Personal_Information.cuil AS cuil, Personal_Information.name AS name, Personal_Information.surname AS surname, IF(Study_Detail.stage = 0, 'En espera','Finalizado') AS status , Type.name AS type, `Study_Detail`.`date_made` AS orderDate from Personal_Information INNER JOIN Patient ON Patient.PK_Dni=Personal_Information.ID_DNI INNER JOIN Medical_Care ON Medical_Care.PK_Patient=Patient.ID_PATIENT INNER JOIN Sector_Patient ON Sector_Patient.PK_MC=Medical_Care.ID_MC INNER JOIN Sector_Hospital ON Sector_Patient.PK_SH=Sector_Hospital.ID_SH INNER JOIN Study_Detail ON Study_Detail.PK_MC=Medical_Care.ID_MC INNER JOIN Type ON Type.ID_TYPE=Study_Detail.PK_TYPE WHERE Sector_Hospital.PK_Hospital= ? " . $condition . " GROUP BY Study_Detail.ID_SD LIMIT ?,?";
$typeOfParameters .= "ii";
array_push($parameters, $initialLimit, $numberOfResultsPerPage);
$result =  executePreparedStatement($sql, $typeOfParameters, $parameters);
$data =  getResultOfPreparedStatement($result);
sendJson($data, $msg, null, $amountOfPages, $currentPage);
