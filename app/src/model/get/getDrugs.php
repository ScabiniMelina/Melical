<?php
include("./../connection.php");
$medicalCareType = $_GET['condition'];
$sql = "SELECT * FROM Resource";
$data = query($sql);
echo json_encode($data);
