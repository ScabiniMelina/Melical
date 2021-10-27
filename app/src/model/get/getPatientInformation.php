<?php
include("./../connection.php");
$id = $_GET["id"];
$sql = "SELECT ID_DNI AS ID,PK_ID_LOCATION AS location, address, address_number AS addressNumber, date_birth AS dateBirth, dni, email, gender, name, phone, surname, dni AS tramitNumber , SUBSTR(tramit_nume,1,2) AS cuilFirstCharacters, SUBSTR(tramit_nume, -1 ) AS cuilLastCharacters FROM `PERSONAL_INFORMATION` WHERE `ID_DNI`=?";
$parameters =  array($id);
$typeOfParameters = "s";
$result = getPreparedStatement($sql, $typeOfParameters, $parameters);
$data = getResultOfPreparedStatement($result);
sendJson($data, null, null, null, null);
