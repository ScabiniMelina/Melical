<?php
include("./../connection.php");
$sql = "SELECT  ID_TYPE_DETAIL, name FROM  TYPE_DETAIL";
$data = query($sql);
echo json_encode($data);