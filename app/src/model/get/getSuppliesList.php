<?php
include("./../connection.php");
$sql = "SELECT  ID_LOCATION, name FROM  LOCATION";
$data = query($sql);
echo json_encode($data);
