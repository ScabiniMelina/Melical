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
$connection = new mysqli($hostName, $user, $pass, $db);
if ($connection->connect_errno) {
    echo "Error al conectarse a la base de datos";
}
// Devuelve un la información obtenida de la base de datos en formato js 
// function getJsonFromDatabase($sql, $connection)
// {
//     $query = $connection->query($sql);
//     $data = $query->fetch_all(MYSQLI_ASSOC);
//     echo json_encode($data);
// }
