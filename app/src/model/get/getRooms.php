<?php

include("./../connection.php");
$numberOfResultsPerPage = 10;
$currentPage = getCurrentPage();
$initialLimit = getPaginationConfig($numberOfResultsPerPage,$currentPage);
$amountOfPages = getAmountOfPagesToCreatePager("Sector_Hospital",$numberOfResultsPerPage);
$sql = "SELECT Sector.name AS seccion, Tier_Sector.tier AS piso,Count.status AS estado, Count.number AS numero FROM `Tier_Sector` INNER JOIN Sector_Hospital on Sector_Hospital.ID_SH=Tier_Sector.PK_SH INNER JOIN Sector ON Sector.ID_SECTOR=Sector_Hospital.PK_Sector INNER JOIN Room ON Tier_Sector.ID_tier=Room.PK_TS INNER JOIN Count ON Count.PK_Room=Room.ID_room where Sector_Hospital.PK_Hospital='1'";
$result =  executePreparedStatement($sql,null, null);
$data =  getResultOfPreparedStatement($result); 
$msg = ['type'=>'success','text'=>'todoCorrecto'];
sendJson($data,$msg,null,null,null);
?>
