<?php
header('Content-Type: application/json');
include("conexion.php");
$dni = $_POST["ID_DNI"];
$sql = "SELECT * FROM `PATIENT` INNER JOIN `PERSONAL_INFORMATION` ON PATIENT.PK_ID_DNI = PERSONAL_INFORMATION.ID_DNI WHERE PERSONAL_INFORMATION.ID_DNI = $dni";
$consultaSql = $conexion->query($sql);
if(!empty($consultaSql) AND mysqli_num_rows($consultaSql)>0){
    $data = $consultaSql->fetch_all(MYSQLI_ASSOC);
    echo json_encode($data);
}else{
    die(mysqli_error($conexion));    
}
$conexion->close();
?>