<?php
header('Content-Type: application/json');
include("./../connection.php");
$sql = "SELECT  ID_TYPE_DETAIL, name FROM  TYPE_DETAIL";
$query = $connection->query($sql);
$data = $query->fetch_all(MYSQLI_NUM);
echo json_encode($data);
$connection->close();