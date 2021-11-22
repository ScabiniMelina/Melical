<?php
include("./../connection.php");
if (!isset($_GET['id'])) {
    $msg['type'] = 'error';
    $msg['text'] = 'Debe guardar la información general del paciente primero';
    sendJson(null, $msg, null, null, null);
    exit();
}
$personalInformationId = $_GET['id'];
$numberOfCardLoads = setValue(0, $_GET['numberOfCardsLoads']);
$numberOfItemsToShow  = setValue(6, $_GET['numberOfItemsToShow']);
$initialRow = $numberOfCardLoads * $numberOfItemsToShow;
$sql = "SELECT Personal_Information.ID_DNI as oldId, Patient_Detail.date AS date, Medical_Care.ID_MC AS id, Type.name AS antecedentName FROM Patient_Detail INNER JOIN Type ON Type.ID_TYPE=Patient_Detail.PK_Type INNER JOIN Medical_Care ON Medical_Care.ID_MC=Patient_Detail.PK_MC INNER JOIN Patient ON Patient.ID_PATIENT=Medical_Care.PK_Patient INNER JOIN Personal_Information ON Personal_Information.ID_DNI=Patient.PK_Dni WHERE Type.PK_Classification=1 AND  Personal_Information.ID_DNI= ? ORDER BY `Patient_Detail`.`date` DESC LIMIT ?,?";
//TODO PREGUNTAR A MEL SI EL  Type.PK_Classification=1 TENDRIA QUE SER 2 TIPO COMO PARA USAR TODAS LAS ENFERMEDADES COMO ANTECEDENTE
$typeOfParameters = "sii";
$parameters = array($personalInformationId, $initialRow, $numberOfItemsToShow);
$result = executePreparedStatement($sql, $typeOfParameters, $parameters);
$data =  getResultOfPreparedStatement($result);
sendJson($data, $msg, null, null, null);
