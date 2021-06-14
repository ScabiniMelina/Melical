<?php
include("conexion.php");
$dni = $_POST['dni']; 
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$fechaNacimieto = $_POST['fechaNacimiento'];
$direccion = $_POST['direccion'];
$direccionN = $_POST['direccionN'];
$telefono = $_POST['telefono'];
$email = $_POST['email'];
$contrasena = $_POST['contrasena'];
$sql = "INSERT INTO PERSONAL_INFORMATION (ID_DNI,name,surname,date_birth,phone,email) VALUES ($dni,$nombre,$apellido,$fechaNacimieto,$telefono,$email)";
$consultaSql = $conexion->query($sql);
// $resultado = $consultaSql->fetch_all(MYSQLI_ASSOC);

// $sql = "INSERT INTO USER VALUES ($dni,$nombre,$apellido,$fechaNacimieto,$email) ";
// $consultaSql = $conexion->query($sql);
// $resultado = $consultaSql->fetch_all(MYSQLI_ASSOC);


$conexion->close();
// echo $resultado;
?>



