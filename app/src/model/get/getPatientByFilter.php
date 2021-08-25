<?php
header('Content-Type: application/json');
include("./../connection.php");
$id = $_GET["id"];
if(!empty($_GET['disease'])){
    foreach($_GET['disease'] as $disease){
              
    }
}

$sql = "SELECT ID_DNI AS ID, dni, name, surname, date_birth AS dateBirth FROM PERSONAL_INFORMATION WHERE";
if (is_numeric($id)) {
    $sql .= " dni LIKE '%$id%' ";
} else {
    $sql .= " name LIKE '%$id%' OR surname LIKE '%$id%'";
}
$query = $connection->query($sql);
$data = $query->fetch_all(MYSQLI_ASSOC);
$msg = ['type' => 'error', 'text' => 'Mensaje de prueba'];
sendQueryMsgId($data, $msg, null);
$connection->close();
