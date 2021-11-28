
<?php
session_start();
include("./../connection.php");
$sector = setSelectValue($_GET["sector"]);
$typeResource = setSelectValue($_GET["typeResource"]);
$resource = setSelectValue($_GET["resource"]);
$parameters = array($_SESSION['ID_HOSPITAL']);
$typeOfParameters = "i";
if (isset($sector)) {
  $condition .= " AND Sector_Hospital.PK_Sector = ?";
  array_push($parameters, $sector);
  $typeOfParameters .= "i";
}
if (isset($typeResource)) {
  $condition .= " AND  Resource.PK_Classification = ?";
  array_push($parameters, $typeResource);
  $typeOfParameters .= "i";
}
if (isset($resource)) {
  $condition .= " AND  Resource.ID_RESOURSE = ?";
  array_push($parameters, $resource);
  $typeOfParameters .= "i";
}
$numberOfResultsPerPage = 10;
$currentPage = getCurrentPage();
$initialLimit = getPaginationConfig($numberOfResultsPerPage, $currentPage);
$sql = "Resourse_Sector INNER JOIN Resource ON Resourse_Sector.PK_Resourse=Resource.ID_RESOURSE INNER JOIN Sector_Hospital ON Sector_Hospital.ID_SH=Resourse_Sector.PK_SH INNER JOIN Sector ON Sector.ID_SECTOR=Sector_Hospital.PK_Sector where  Sector_Hospital.PK_Hospital=? " . $condition;
$amountOfPages = getAmountOfPagesToCreatePager($sql, $numberOfResultsPerPage, $typeOfParameters, $parameters);
$sql = "SELECT Resource.ID_RESOURSE AS codigo, Resource.ID_RESOURSE AS ID, Resource.name AS recurso, Resourse_Sector.cantidad AS cantidad, Sector.name AS seccion FROM " . $sql . " LIMIT ?,?";

$typeOfParameters .= "ii";
array_push($parameters, $initialLimit, $numberOfResultsPerPage);
$result =  executePreparedStatement($sql, $typeOfParameters, $parameters);
$data =  getResultOfPreparedStatement($result);
sendJson($data, $msg, null, $amountOfPages, $currentPage);
