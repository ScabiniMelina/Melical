<?php
include("./../connection.php");
if (!isset($_GET['id'])) {
    $msg['type'] = 'error';
    $msg['text'] = 'Debe guardar la información general del paciente primero';
    sendJson(null, $msg, null, null, null);
    exit();
}
$personalInformationId = $_GET['id'];
$acceptExtensions = array('jpg', 'png', 'jpeg');
$msg = array();
$dirPath =  $destinationPathToPatientFacialImages . $personalInformationId . "/";
$data['images'] = getImagesFromPath($dirPath, $acceptExtensions);
sendJson($data, $msg, null, null, null);
