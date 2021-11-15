<?php
include("./../connection.php");
if (!isset($_POST['id'])) {
    $msg['type'] = 'error';
    $msg['text'] = 'Debe guardar la información general del paciente primero';
    sendJson(null, $msg, null, null, null);
    exit();
}
$personalInformationId = $_POST['id'];
$patientFaceImages = $_FILES['patientFaces'];
$destinationPath = $_SERVER['DOCUMENT_ROOT'] . $destinationPathToPatientFacialImages . $personalInformationId . "/";
$allowedExtensions = array("gif", "jpeg", "jpg", "png");
$uploadMsg = uploadFiles($patientFaceImages,  $destinationPath, $allowedExtensions);
sendJson(null, $uploadMsg, null, null, null);
