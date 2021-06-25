<?php
header('Content-Type: application/json');
include("conexion.php");
$sql = "SELECT * FROM PERSONAL_INFORMATION";
$consultaSql = $connection->query($sql);
$data = $consultaSql->fetch_all(MYSQLI_ASSOC);
echo json_encode($data);
$connection->close();
?>