<?php
include("./../connection.php");
$medicalCareType = $_GET['condition'];
$sql = "SELECT TYPE_DETAIL.ID_TYPE_DETAIL, TYPE_DETAIL.name FROM TYPE_DETAIL INNER JOIN CLASSIFICATION_DETAIL WHERE CLASSIFICATION_DETAIL.ID_CLASSIFICATION_DETAIL = TYPE_DETAIL.PK_ID_CLASSIFICATION_DETAIL && CLASSIFICATION_DETAIL.name='$medicalCareType'";
$data = query($sql);
echo json_encode($data);
?>