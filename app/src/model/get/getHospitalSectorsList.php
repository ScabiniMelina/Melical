<?php
header('Content-Type: application/json');
include("./../connection.php");
$medicalCareType = $_GET['condition'];
$sql = "SELECT `ID_SECTOR`,`sector` FROM `SECTOR`";
$query = $connection->query($sql);
$data = $query->fetch_all(MYSQLI_NUM);
echo json_encode($data);
$connection->close();
?>