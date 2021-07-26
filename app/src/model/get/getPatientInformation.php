<?php
header('Content-Type: application/json');
include("./../connection.php");
$dni = $_POST["ID_DNI"];
$sql = "SELECT * FROM `PERSONAL_INFORMATION` WHERE `ID_DNI` = '$dni'";
$query = $connection->query($sql);
$data = $query->fetch_all(MYSQLI_ASSOC);
echo json_encode($data);
$connection->close();
