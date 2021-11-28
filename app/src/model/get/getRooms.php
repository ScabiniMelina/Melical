<?php
session_start();
include("./../connection.php");
$numberOfResultsPerPage = 2;
$currentPage = getCurrentPage();
$initialLimit = getPaginationConfig($numberOfResultsPerPage, $currentPage);
$parameters = array($_SESSION['ID_HOSPITAL']);
$typeOfParameters = "i";
$amountOfPages = getAmountOfPagesToCreatePager(" Tier_Sector INNER JOIN Sector_Hospital ON Sector_Hospital.ID_SH=Tier_Sector.PK_SH INNER JOIN Room ON Room.PK_TS = Tier_Sector.ID_tier INNER JOIN Sector ON Sector.ID_SECTOR = Sector_Hospital.PK_Sector WHERE Sector_Hospital.PK_Hospital=? ", $numberOfResultsPerPage, $typeOfParameters, $parameters);
$sql = "SELECT Room.ID_room AS ID,Sector.name AS sector, Tier_Sector.tier AS tier,IF(Room.status = 0, 'Libre','Ocupado') AS status, Room.number AS number, IF(Room.type=0,'Habitación',IF(Room.type=1,'Consultorio','Quirófano')) AS type FROM Tier_Sector INNER JOIN Sector_Hospital ON Sector_Hospital.ID_SH=Tier_Sector.PK_SH INNER JOIN Room ON Room.PK_TS = Tier_Sector.ID_tier INNER JOIN Sector ON Sector.ID_SECTOR = Sector_Hospital.PK_Sector WHERE Sector_Hospital.PK_Hospital=? LIMIT ?,?";
$typeOfParameters = "iii";
$parameters = array($_SESSION['ID_HOSPITAL'], $initialLimit, $numberOfResultsPerPage);
$result =  executePreparedStatement($sql, $typeOfParameters, $parameters);
$data =  getResultOfPreparedStatement($result);
sendJson($data, $msg, null, $amountOfPages, $currentPage);
