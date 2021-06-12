<?php
include("conexion.php");
$dni = $POST['dni']; 
$nombre = $POST['nombre'];
$apellido = $POST['apellido'];
$fechaNacimieto = $POST['fechaNacimiento'];
$direccion = $POST['direccion'];
$direccionN = $POST['direccionN'];
$telefono = $POST['telefono'];
$email = $POST['email'];
$contrasena = $POST['contrasena'];
$sql = "INSERT INTO PERSONAL_INFORMATION VALUES ($dni,$nombre,$apellido,$fechaNacimieto,$email) ";
$consultaSql = $conexion->query($sql);
$resultado = $consultaSql->fetch_all(MYSQLI_ASSOC);

// $sql = "INSERT INTO USER VALUES ($dni,$nombre,$apellido,$fechaNacimieto,$email) ";
// $consultaSql = $conexion->query($sql);
// $resultado = $consultaSql->fetch_all(MYSQLI_ASSOC);


$conexion->close();
// echo $resultado;
?>



