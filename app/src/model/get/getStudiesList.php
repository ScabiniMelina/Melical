<?php
include("./../connection.php");
$sql = "SELECT Type.ID_TYPE, Type.name FROM Type INNER JOIN Classification ON Classification.ID_CLASSIFICATION=Type.PK_Classification WHERE Classification.ID_CLASSIFICATION=5";
$data = query($sql);
echo json_encode($data);
