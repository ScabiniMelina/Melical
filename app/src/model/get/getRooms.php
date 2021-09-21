<?php
include("./../connection.php");
$sql = "SELECT ID_SECTOR, sector FROM SECTOR";
$data = query($sql);
echo json_encode($data);
