<?php
session_start();
include("./../connection.php");
$numberOfResultsPerPage = 2;
$currentPage = getCurrentPage();
$initialLimit = getPaginationConfig($numberOfResultsPerPage, $currentPage);
$parameters = array($_SESSION['ID_HOSPITAL']);
$typeOfParameters = "i";
$sql2 = "Personal_Information INNER JOIN Patient ON Patient.PK_Dni=Personal_Information.ID_DNI INNER JOIN Medical_Care ON Medical_Care.PK_Patient=Patient.ID_PATIENT INNER JOIN Sector_Patient ON Sector_Patient.PK_MC=Medical_Care.ID_MC INNER JOIN Sector_Hospital ON Sector_Patient.PK_SH=Sector_Hospital.ID_SH INNER JOIN Study_Detail ON Study_Detail.PK_MC=Medical_Care.ID_MC INNER JOIN Type ON Type.ID_TYPE=Study_Detail.PK_TYPE WHERE Sector_Hospital.PK_Hospital= ?  GROUP BY Study_Detail.ID_SD ";
$amountOfPages = getAmountOfPagesToCreatePager($sql2, $numberOfResultsPerPage, $typeOfParameters, $parameters);
$sql = "SELECT  `Study_Detail`.ID_SD AS ID,Personal_Information.cuil AS cuil, Personal_Information.name AS name, Personal_Information.surname AS surname, IF(Study_Detail.stage = 0, 'En espera','Finalizado') AS status , Type.name AS type , `Study_Detail`.`date_made` AS orderDate FROM Personal_Information INNER JOIN Patient ON Patient.PK_Dni=Personal_Information.ID_DNI INNER JOIN Medical_Care ON Medical_Care.PK_Patient=Patient.ID_PATIENT INNER JOIN Sector_Patient ON Sector_Patient.PK_MC=Medical_Care.ID_MC INNER JOIN Sector_Hospital ON Sector_Patient.PK_SH=Sector_Hospital.ID_SH INNER JOIN Study_Detail ON Study_Detail.PK_MC=Medical_Care.ID_MC INNER JOIN Type ON Type.ID_TYPE=Study_Detail.PK_TYPE WHERE Sector_Hospital.PK_Hospital= ?  GROUP BY Study_Detail.ID_SD LIMIT ?,?";
$typeOfParameters = "iii";
$parameters = array($_SESSION['ID_HOSPITAL'], $initialLimit, $numberOfResultsPerPage);
$result =  executePreparedStatement($sql, $typeOfParameters, $parameters);
$data =  getResultOfPreparedStatement($result);
sendJson($data, $msg, null, $amountOfPages, $currentPage);
