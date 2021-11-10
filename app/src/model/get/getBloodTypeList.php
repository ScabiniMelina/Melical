<?php
include("./../connection.php");
$sql = "SELECT * FROM  Blood";
$data = query($sql);
echo json_encode($data);
