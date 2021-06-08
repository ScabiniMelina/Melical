<?php
header('Content-Type: application/json');
include("conexion.php");
$sql = $_POST["sql"];
$consultaSql = $conexion->query($sql);
$resultado = mysqli_fetch_all($consultaSql,MYSQLI_ASSOC);
echo json_encode($resultado);
?>