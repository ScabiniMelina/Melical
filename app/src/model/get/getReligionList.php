<?php
include("./../connection.php");
$sql = "SELECT  * FROM  Religion";
$data = query($sql);
echo json_encode($data);
