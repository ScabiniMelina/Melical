<?php
header('Content-Type: application/json');
include("conexion.php");
$tabla = $_POST["tabla"];
$columnaId = $_POST["columnaId"];
$columnaLista = $_POST["columnaLista"];
$sql = "SELECT ". $columnaId ." , ". $columnaLista . " FROM " . $tabla;
$consultaSql = $conexion->query($sql);
if(!empty($consultaSql) AND mysqli_num_rows($consultaSql)>0){
    $data = $consultaSql->fetch_all(MYSQLI_ASSOC);
    echo json_encode($data);
}else{
    die(mysqli_error($conexion));    
}
$conexion->close();
?>
