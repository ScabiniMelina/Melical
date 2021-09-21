<?php
include("./../connection.php");
$sql = "SELECT 	ID_RESOURCE , resource FROM RESOURCE";
$result = getPreparedStatement($sql,null, null);
$data =  getResultOfPreparedStatement($result); 
$msg = ['type'=>'success','text'=>'todoCorrecto'];
sendJson($data,$msg,null,null);
