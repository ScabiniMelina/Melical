<?php
include("./../connection.php");
$medicalCareType = $_GET['condition'];
$sql = "SELECT Type.ID_TYPE, Type.name FROM Type INNER JOIN Classification ON Classification.ID_CLASSIFICATION=Type.PK_Classification WHERE Classification.ID_CLASSIFICATION = $medicalCareType";
$data = query($sql);
echo json_encode($data);
