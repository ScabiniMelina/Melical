<?php
session_start();
include("./../connection.php");
$numberOfResultsPerPage = 10;
$currentPage = getCurrentPage();
$initialLimit = getPaginationConfig($numberOfResultsPerPage, $currentPage);
$sql = "Resourse_Sector INNER JOIN Resource ON Resourse_Sector.PK_Resourse=Resource.ID_RESOURSE INNER JOIN Sector_Hospital ON Sector_Hospital.ID_SH=Resourse_Sector.PK_SH INNER JOIN Sector ON Sector.ID_SECTOR=Sector_Hospital.PK_Sector WHERE Sector_Hospital.PK_Hospital=?";
$parameters = array($_SESSION['ID_HOSPITAL']);
$typeOfParameters = "i";
$amountOfPages = getAmountOfPagesToCreatePager($sql, $numberOfResultsPerPage, $typeOfParameters, $parameters);
$sql = "SELECT Resource.ID_RESOURSE AS codigo, Resource.ID_RESOURSE AS ID, Resource.name AS recurso, Resourse_Sector.cantidad AS cantidad, Sector.name AS seccion FROM Resourse_Sector INNER JOIN Resource ON Resourse_Sector.PK_Resourse=Resource.ID_RESOURSE INNER JOIN Sector_Hospital ON Sector_Hospital.ID_SH=Resourse_Sector.PK_SH INNER JOIN Sector ON Sector.ID_SECTOR=Sector_Hospital.PK_Sector WHERE Sector_Hospital.PK_Hospital=? LIMIT ?,?";
$typeOfParameters = "iii";
$parameters = array($_SESSION['ID_HOSPITAL'], $initialLimit, $numberOfResultsPerPage);
$result =  executePreparedStatement($sql, $typeOfParameters, $parameters);
$data =  getResultOfPreparedStatement($result);
sendJson($data, $msg, null, $amountOfPages, $currentPage);
