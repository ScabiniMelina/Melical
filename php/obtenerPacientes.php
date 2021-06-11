<?php
header('Content-Type: application/json');
include("conexion.php");
$sql = "SELECT * FROM PERSONAL_INFORMATION";
$consultaSql = $conexion->query($sql);
$resultado = $consultaSql->fetch_all(MYSQLI_ASSOC);
$conexion->close();
echo json_encode($resultado);
?>