<?php
header('Content-Type: application/json');
include("./../connection.php");
$dni = $_POST["ID_DNI"];
$sql = "SELECT * FROM PERSONAL_INFORMATION WHERE";
if(is_numeric($dni)){
    $sql .=" dni LIKE '%$dni%' ";
}else{
    $sql .=" name LIKE '%$dni%' OR surname LIKE '%$dni%'";
}
$$query = $connection->query($sql);
$data = $$query->fetch_all(MYSQLI_ASSOC);
echo json_encode($data);
$connection->close();
