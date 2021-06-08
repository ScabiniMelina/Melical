<?php
    $hostName = 'mattprofe.com.ar';
    $usuario = '3700';
    $contrasena = '3700';
    $bd = "3700";
    $conexion = new mysqli($hostName,$usuario,$contrasena,$bd);
    if($conexion->connect_errno){
        echo "Error al conectarse a la base de datos";
    }
?>