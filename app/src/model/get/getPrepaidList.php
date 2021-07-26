<?php
header('Content-Type: application/json');
include("./../connection.php");
$sql = "SELECT  ID_PREPAID, name FROM  PREPAID";
$query = $connection->query($sql);
$data = $query->fetch_all(MYSQLI_NUM);
echo json_encode($data);
$connection->close();
