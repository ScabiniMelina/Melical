<?php
include("./../connection.php");
$sql = "SELECT  ID_PREPAID, name FROM  Prepaid";
$data = query($sql);
echo json_encode($data);
