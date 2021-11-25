<?php
//TODO ALEX: HACER SQL
include("./../connection.php");
$personalInformationId = $_GET['id'];
var_dump($personalInformationId);
$sql = "SELECT Personal_Information.cuil, CONCAT(Personal_Information.name, ' ',Personal_Information.surname) AS fullName, IF(Personal_Information.gender = 0, 'Femenino', IF(Personal_Information.gender = 1,'Masculino', ''))AS gender, TIMESTAMPDIFF(YEAR,Personal_Information.date_birth,CURDATE())  AS age , Blood.name AS blood FROM Personal_Information INNER JOIN Patient ON Patient.PK_Dni = Personal_Information.ID_DNI INNER JOIN Blood ON Blood.ID_BLOOD = Patient.PK_Blood where Personal_Information.ID_DNI=?";
$typeOfParameters = "s";
$parameters = array($personalInformationId);
$result = executePreparedStatement($sql, $typeOfParameters, $parameters);
$data =  getResultOfPreparedStatement($result);
sendJson($data, $msg, null, null, null);
