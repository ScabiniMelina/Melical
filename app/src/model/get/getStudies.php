<?php

include("./../connection.php");
$numberOfResultsPerPage = 10;
$currentPage = getCurrentPage();
$initialLimit = getPaginationConfig($numberOfResultsPerPage,$currentPage);
$amountOfPages = getAmountOfPagesToCreatePager("Sector_Hospital",$numberOfResultsPerPage);
$sql = "SELECT Personal_Information.DNI AS dni, Personal_Information.name AS nombre, Personal_Information.surname AS apellido, Study_Detail.date_made AS fecha, Type.name AS tipo from Personal_Information INNER JOIN Patient ON Patient.PK_Dni=Personal_Information.ID_DNI INNER JOIN Medical_Care ON Medical_Care.PK_Patient=Patient.ID_PATIENT INNER JOIN Sector_Patient ON Sector_Patient.PK_MC=Medical_Care.ID_MC INNER JOIN Sector_Hospital ON Sector_Patient.PK_SH=Sector_Hospital.ID_SH INNER JOIN Study_Detail ON Study_Detail.PK_MC=Medical_Care.ID_MC INNER JOIN Type ON Type.ID_TYPE=Study_Detail.PK_TYPE WHERE Sector_Hospital.PK_Hospital='1'";
$result =  executePreparedStatement($sql,null, null);
$data =  getResultOfPreparedStatement($result); 
$msg = ['type'=>'success','text'=>'todoCorrecto'];
sendJson($data,$msg,null,null,null);
?>
