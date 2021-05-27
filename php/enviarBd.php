<?php
    include("conexion.php");
    $usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];
    echo $dni . "    ".$contrasena;
    $sql = 'SELECT * FROM doctor WHERE  (ID_DNI_DOCTOR = $usuario  OR telefono = $usuario OR email = $usuario ) AND contrasena = $contrasena'; 
    $bdResultante = $conexion->query($sql);
    if($bdResultante->num_rows > 0){

    }
    $sql = 'SELECT * FROM paciente WHERE  (ID_DNI = $usuario  OR telefono = $usuario OR email = $usuario ) AND contrasena = $contrasena';


?>