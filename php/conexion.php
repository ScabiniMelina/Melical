<?php
    $hostName = 'localhost';
    $user = 'u812890733_melicaldb';
    $pass = 'Melitec3';
    $db = "u812890733_melical";
    //BD DE BAEZ
    // $hostName = 'mattprofe.com.ar';
    // $usuario = '3700';
    // $contrasena = '3700';
    // $bd = "3700";
    $connection = new mysqli($hostName,$user,$pass,$db);
    if($connection->connect_errno){
        echo "Error al conectarse a la base de datos";
    }
?>