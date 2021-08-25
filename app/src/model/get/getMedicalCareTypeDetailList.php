<?php
header('Content-Type: application/json');
include("./../connection.php");
$medicalCareType = $_GET['condition'];
$sql = "SELECT TYPE_DETAIL.ID_TYPE_DETAIL, TYPE_DETAIL.name FROM TYPE_DETAIL INNER JOIN CLASSIFICATION_DETAIL WHERE CLASSIFICATION_DETAIL.ID_CLASSIFICATION_DETAIL = TYPE_DETAIL.PK_ID_CLASSIFICATION_DETAIL && CLASSIFICATION_DETAIL.name='$medicalCareType'";
$query = $connection->query($sql);
$data = $query->fetch_all(MYSQLI_NUM);
echo json_encode($data);
$connection->close();
?>