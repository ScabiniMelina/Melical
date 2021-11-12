<?php

include("./../connection.php");
$numberOfResultsPerPage = 10;
$currentPage = getCurrentPage();
$initialLimit = getPaginationConfig($numberOfResultsPerPage,$currentPage);
$amountOfPages = getAmountOfPagesToCreatePager("Resourse_Sector",$numberOfResultsPerPage);
$sql = "SELECT Resource.ID_RESOURSE AS codigo, Resource.name AS recurso, Resourse_Sector.cantidad AS cantidad, Sector.name AS seccion, Tier_Sector.tier AS piso FROM Resourse_Sector INNER JOIN Resource ON Resourse_Sector.PK_Resourse=Resource.ID_RESOURSE INNER JOIN Sector_Hospital ON Sector_Hospital.ID_SH=Resourse_Sector.PK_SH INNER JOIN Sector ON Sector.ID_SECTOR=Sector_Hospital.PK_Sector INNER JOIN Tier_Sector ON Tier_Sector.PK_SH=Sector_Hospital.ID_SH WHERE Sector_Hospital.PK_Hospital='1'";
$result =  executePreparedStatement($sql,null, null);
$data =  getResultOfPreparedStatement($result); 
$msg = ['type'=>'success','text'=>'todoCorrecto'];
sendJson($data,$msg,null,null,null);
?>
 