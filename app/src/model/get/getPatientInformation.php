<?php
header('Content-Type: application/json');
include("./../connection.php");
$id = $_GET["id"];
$sql = "SELECT * FROM `PERSONAL_INFORMATION` WHERE `ID_DNI` = '$id'";
$query = $connection->query($sql);
$data = $query->fetch_all(MYSQLI_ASSOC);
echo json_encode($data);
$connection->close();
