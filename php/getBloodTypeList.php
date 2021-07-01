<?php
header('Content-Type: application/json');
include("conexion.php");
$sql = "SELECT  ID_BLOOD_TYPE, type FROM  BLOOD_TYPE";
$consultaSql = $connection->query($sql);
$data = $consultaSql->fetch_all(MYSQLI_NUM);
echo json_encode($data);
$connection->close();
?>
