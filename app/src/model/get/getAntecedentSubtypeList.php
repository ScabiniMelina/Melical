<?php
header('Content-Type: application/json');
include("connection.php");
$sql = "SELECT TYPE_DETAIL.name,CLASSIFICATION_DETAIL.name FROM `TYPE_DETAIL` INNER JOIN CLASSIFICATION_DETAIL ON TYPE_DETAIL.PK_ID_CLASSIFICATION_DETAIL = CLASSIFICATION_DETAIL.ID_CLASSIFICATION_DETAIL WHERE CLASSIFICATION_DETAIL.name = ' Antecedentes'";

$$query = $connection->query($sql);
$data = $$query->fetch_all(MYSQLI_NUM);
echo json_encode($data);
$connection->close();
?>
