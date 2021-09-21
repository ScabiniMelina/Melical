<?php
include("./../connection.php");
$sql = "SELECT  ID_BLOOD_TYPE, type FROM  BLOOD_TYPE";
$data = query($sql);
echo json_encode($data);
