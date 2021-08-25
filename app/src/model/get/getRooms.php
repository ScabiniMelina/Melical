<?php
header('Content-Type: application/json');
include("./../connection.php");
$sql = "SELECT sector FROM SECTOR";
$query = $connection->query($sql);
$data = $query->fetch_all(MYSQLI_ASSOC);
$msg = ['type'=>'success','text'=>'todoCorrecto'];
sendQueryMsgId($data,$msg,null);
$connection->close();
