<?php
include("./../connection.php");
$sql = "CALL 2GET_ALL_PATIENTS_WHIT_PHOTO()";
$result = executePreparedStatement($sql, null, null);
$data =  getResultOfPreparedStatement($result);
sendJson($data, $msg, null, null, null);
