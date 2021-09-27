<?php
include("./../connection.php");
$sql = "SELECT dni, surname FROM PERSONAL_INFORMATION";
$data = query($sql);
$msg = ['type'=>'success','text'=>'todoCorrecto'];
sendJson($data,$msg,null,null,null);
