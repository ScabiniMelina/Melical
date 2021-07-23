<?php
header('Content-Type: application/json');
include("connection.php");
$sql = "SELECT * FROM PERSONAL_INFORMATION";
$$query = $connection->query($sql);
$data = $$query->fetch_all(MYSQLI_ASSOC);
echo json_encode($data);
$connection->close();
?>