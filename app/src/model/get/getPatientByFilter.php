<?php
include("./../connection.php");
//TODO: LAZY LOAD
// $conditionsToFilter = array_filter($_GET);
echo "<pre>" . print_r($_GET, true) . "</pre>";

$typeDetailConditions = array_merge($_GET["disease"], $_GET["complications"], $_GET["treatment"], $_GET["studies"], $_GET["symptom"], $_GET["drug"]);
echo "<pre>" . print_r($_GET, true) . "</pre>";
echo "<pre>" . print_r($typeDetailConditions, true) . "</pre>";
//TODO: CORREGIR SENTENCIA SQL.
$sql = "SELECT DISTINCT  PERSONAL_INFORMATION.DNI, PERSONAL_INFORMATION.name, PERSONAL_INFORMATION.surname, PERSONAL_INFORMATION.date_birth FROM MEDICAL_CARE INNER JOIN PATIENT ON PATIENT.ID_PATIENT=MEDICAL_CARE.PK_ID_PATIENT INNER JOIN PERSONAL_INFORMATION ON PERSONAL_INFORMATION.ID_DNI=PATIENT.PK_ID_DNI INNER JOIN DETAIL_PATIENT ON MEDICAL_CARE.ID_MEDICAL_CARE=DETAIL_PATIENT.PK_ID_MEDICAL_CARE INNER JOIN SET_CLASSIFICATION ON DETAIL_PATIENT.PK_ID_SET_CLASSIFICATION = SET_CLASSIFICATION.ID_SET_CLASSIFICATION INNER JOIN SUBTYPE_DETAIL ON SUBTYPE_DETAIL.ID_SUBTYPE_DETAIL = SET_CLASSIFICATION.PK_ID_SUBTYPE_DETAIL ";
$conditions = '';
$typeOfParameters = '';
$parameters = array();
foreach ($typeDetailConditions as  $i => $conditionsToFilter) {
    addParameterToPreparedStatementsConfig($conditionsToFilter, 'i', 'DETAIL_PATIENT.TYPE_DETAIL= ? ');
}
addParameterToPreparedStatementsConfig($_GET['startOfHospitalization'], 's', 'MEDICAL_CARE.start_date <=? ');
addParameterToPreparedStatementsConfig($_GET['endOfHospitalization'], 's', 'MEDICAL_CARE.finish_date >=? ');
addParameterToPreparedStatementsConfig($_GET['gender'], 'i', 'PERSONAL_INFORMATION.gender= ?');
addParameterToPreparedStatementsConfig($_GET['minimumAge'], 'i', 'TIMESTAMPDIFF(YEAR,PERSONAL_INFORMATION.date_birth,CURDATE()) >= ?');
addParameterToPreparedStatementsConfig($_GET['maximumAge'], 'i', 'TIMESTAMPDIFF(YEAR,PERSONAL_INFORMATION.date_birth,CURDATE()) <= ?');
// strrpos($conditions,"AND"); Encuentra la posición de la última aparición de un substring en un string
//Devuelve una parte del string definida por los parámetros start y length.
$conditions = substr($conditions, 0,  strrpos($conditions, "AND"));

if (count($parameters) > 0) {
    $sql = " WHERE " . $conditions;
}

var_dump($parameters);
var_dump($conditions);
var_dump($typeOfParameters);
$result = executePreparedStatement($sql, $typeOfParameters, $parameters);
$data =  getResultOfPreparedStatement($result);
sendJson($data, $msg, null, null, null);
