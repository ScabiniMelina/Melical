<?php
session_start();
include("./../connection.php");
$sector =  setSelectValue($_GET['sector']);
$condition =  "";
$hospitalId = $_SESSION['ID_HOSPITAL'];
if (isset($sector)) {
    $condition .= " AND Sector_Hospital.PK_Sector = $sector";
}
$sql = "SELECT DISTINCT Classification.ID_CLASSIFICATION, Classification.name FROM Resource INNER JOIN Resourse_Sector ON Resourse_Sector.PK_Resourse = Resource.ID_RESOURSE INNER JOIN Sector_Hospital ON Sector_Hospital.ID_SH = Resourse_Sector.PK_SH INNER JOIN Classification ON Classification.ID_CLASSIFICATION = Resource.PK_Classification 
WHERE Sector_Hospital.PK_Hospital = $hospitalId " . $condition;
$data = query($sql);
echo json_encode($data);
