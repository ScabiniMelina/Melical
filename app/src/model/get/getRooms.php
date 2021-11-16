<?php
session_start();
include("./../connection.php");
$numberOfResultsPerPage = 2;
$currentPage = getCurrentPage();
$initialLimit = getPaginationConfig($numberOfResultsPerPage,$currentPage);
$parameters = array($_SESSION['ID_HOSPITAL']);
$typeOfParameters = "i";
$amountOfPages = getAmountOfPagesToCreatePager(" `Tier_Sector` INNER JOIN Sector_Hospital on Sector_Hospital.ID_SH=Tier_Sector.PK_SH INNER JOIN Sector ON Sector.ID_SECTOR=Sector_Hospital.PK_Sector INNER JOIN Room ON Tier_Sector.ID_tier=Room.PK_TS INNER JOIN Count ON Count.PK_Room=Room.ID_room where Sector_Hospital.PK_Hospital= ? ", $numberOfResultsPerPage,$typeOfParameters,$parameters);
$sql = "SELECT Sector.name AS seccion, Tier_Sector.tier AS piso,Count.status AS estado, Count.number AS numero FROM `Tier_Sector` INNER JOIN Sector_Hospital on Sector_Hospital.ID_SH=Tier_Sector.PK_SH INNER JOIN Sector ON Sector.ID_SECTOR=Sector_Hospital.PK_Sector INNER JOIN Room ON Tier_Sector.ID_tier=Room.PK_TS INNER JOIN Count ON Count.PK_Room=Room.ID_room where Sector_Hospital.PK_Hospital='1' LIMIT ?,?";
$typeOfParameters = "ii";
$parameters = array($initialLimit, $numberOfResultsPerPage);
$result =  executePreparedStatement($sql,$typeOfParameters, $parameters);
$data =  getResultOfPreparedStatement($result); 
sendJson($data,$msg,null, $amountOfPages, $currentPage);
?>

