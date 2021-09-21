<?php
include("./../connection.php");
$sql = "SELECT  ID_RELIGION, name FROM  RELIGION";
$data = query($sql); 
echo json_encode($data);
