<?php
include("./../connection.php");
$id =  $_GET['id'];
$pathToDelete =  $_GET['pathToDelete'];
deleteFile($pathToDelete);
sendJson(null, $msg, null, null, null);
