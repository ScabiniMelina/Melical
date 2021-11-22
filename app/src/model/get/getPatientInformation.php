<?php
include("./../connection.php");
$id = $_GET["id"];
$sql = "SELECT ID_DNI AS ID,PK_Location AS location, adress AS address, adress_number AS addressNumber, date_birth AS dateBirth, dni, email, gender, name, phone, surname, dni AS tramitNumber , SUBSTR(cuil,1,2) AS cuilFirstCharacters, SUBSTR(cuil, -1 ) AS cuilLastCharacters FROM Personal_Information WHERE ID_DNI =?";
$parameters =  array($id);
$typeOfParameters = "s";
$result = executePreparedStatement($sql, $typeOfParameters, $parameters);
$data = getResultOfPreparedStatement($result);
sendJson($data, null, null, null, null);
