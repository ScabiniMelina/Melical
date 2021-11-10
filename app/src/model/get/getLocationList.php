<?php
include("./../connection.php");
$sql = "SELECT * FROM Location";
$data = query($sql);
echo json_encode($data);
