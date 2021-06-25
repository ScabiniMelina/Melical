<?php
header('Content-Type: application/json');
include("conexion.php");
$tabla = $_POST["tabla"];
$columnaId = $_POST["columnaId"];
$columnaLista = $_POST["columnaLista"];
$sql = "SELECT ". $columnaId ." , ". $columnaLista . " FROM " . $tabla;
$consultaSql = $conexion->query($sql);
$data = $consultaSql->fetch_all(MYSQLI_ASSOC);
echo json_encode($data);
$conexion->close();
?>
