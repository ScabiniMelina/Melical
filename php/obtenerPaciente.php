<?php
header('Content-Type: application/json');
include("conexion.php");
$dni = $_POST["ID_DNI"];
$sql = "SELECT * FROM PERSONAL_INFORMATION WHERE ID_DNI=".$dni;
$consultaSql = $conexion->query($sql);
$resultado = $consultaSql->fetch_all(MYSQLI_ASSOC);
$conexion->close();
echo json_encode($resultado);
?>