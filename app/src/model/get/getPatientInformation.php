<?php
header('Content-Type: application/json');
include("./../connection.php");
$id = $_GET["id"];
$sql = "SELECT ID_DNI AS ID,PK_ID_LOCATION AS location, address, address_number AS addressNumber, date_birth AS dateBirth, dni, email, gender, name, phone, surname, tramit_nume AS tramitNumber FROM `PERSONAL_INFORMATION` WHERE `ID_DNI` = '$id'";
$query = $connection->query($sql);
$data = $query->fetch_all(MYSQLI_ASSOC);
sendQueryMsgId($data, $null, null);
$connection->close();
