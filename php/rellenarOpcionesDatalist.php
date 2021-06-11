<?php
header('Content-Type: application/json');
include("conexion.php");
$tabla = $_POST["tabla"];
$columnaId = $_POST["columnaId"];
$columnaList = $_POST["columnaLista"];
$sql = "SELECT ". $columnaId ." , ". $columnaList . " FROM " . $tabla;
$consultaSql = $conexion->query($sql);
$resultado = $consultaSql->fetch_all(MYSQLI_ASSOC);
$conexion->close();
echo json_encode($resultado);
?>
