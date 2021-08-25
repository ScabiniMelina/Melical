<?php
header('Content-Type: application/json');
include("./../connection.php");
$sql = "SELECT resource FROM RESOURCE";
$query = $connection->query($sql);
$data = $query->fetch_all(MYSQLI_ASSOC);
$msg = ['type'=>'success','text'=>'todoCorrecto'];
sendQueryMsgId($data,$msg,null);
$connection->close();
