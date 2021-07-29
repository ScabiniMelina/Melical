<?php
header('Content-Type: application/json');
include("./../connection.php");
$sql = "SELECT ID_DNI AS ID, dni, name, surname, date_birth AS dateBirth  FROM PERSONAL_INFORMATION";
$query = $connection->query($sql);
$data = $query->fetch_all(MYSQLI_ASSOC);
$msg = ['type'=>'success','text'=>'todoCorrecto'];
sendQueryMsgId($data,$msg,null);
$connection->close();
