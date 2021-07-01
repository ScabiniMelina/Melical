<?php
header('Content-Type: application/json');
include("conexion.php");
$sql = "SELECT  ID_PREPAID, name FROM  PREPAID";
$consultaSql = $connection->query($sql);
$data = $consultaSql->fetch_all(MYSQLI_NUM);
echo json_encode($data);
$connection->close();
?>
