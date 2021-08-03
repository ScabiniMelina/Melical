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

function sendQueryMsgId($databaseInformation, $msg, $newElementID){ 
    $elementsToSend= [];
    if (isset($databaseInformation)) {
        $elementsToSend['db'] = $databaseInformation;
    }
    if (isset($msg)) {
        $elementsToSend['msg'] = $msg;
    }
    if (isset($newElementID)) {
        $elementsToSend['id'] = $newElementID;
    }
    echo json_encode($elementsToSend, JSON_FORCE_OBJECT);
}

//Crea un nuevo id encriptado con md5, no repetible 
function getMd5Id($table, $primaryKeyName){
    global $connection;
    do {
        $currentDateTime = date('YmdHis');
        $md5Id = md5($currentDateTime);
        $sql = "SELECT * FROM `$table` WHERE `$primaryKeyName`='$md5Id'";
        $response = mysqli_query($connection, $sql);
        if (!$response) {
            echo "Error: " . $sql . "<br>" . mysqli_error($connection);
            break;
        }
    } while ($response->num_rows > 0);
    return $md5Id;
}

function getPutRequestParameters(){
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        parse_str(file_get_contents("php://input"),$_PUT);
        return $_PUT;
    }
}

