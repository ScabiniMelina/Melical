<?php
include("./../connection.php");
$id = $_GET["id"];
$sql = "SELECT ID_DNI AS ID, dni, name, surname, date_birth AS dateBirth FROM PERSONAL_INFORMATION WHERE";
if(isset($id)){
    $parameters =  array($id);
    if (is_numeric($id)) {
        $sql .= " dni LIKE ?";
        $typeOfParameters = "i";
        $parameters = array("%$id%");
    } else {
        $sql .= " name LIKE ? OR surname LIKE ?";
        $typeOfParameters = "ss";
        $parameters = array("%$id%","%$id%");

    }
}
$result = getPreparedStatement($sql,$typeOfParameters, $parameters);
$data = getResultOfPreparedStatement($result);
$msg = ['type' => 'error', 'text' => 'Mensaje de prueba'];
sendJson($data, $msg, null,null,null);
