<?php
session_start();
include("./../connection.php");
$sector =  setSelectValue($_GET['sector']);
$typeResource =  setSelectValue($_GET['typeResource']);
$condition =  "";
$hospitalId = $_SESSION['ID_HOSPITAL'];
if (isset($sector)) {
    $condition .= " AND Sector_Hospital.PK_Sector = $sector";
}
if (isset($typeResource)) {
    $condition .= " AND  Resource.PK_Classification = $typeResource";
}
$sql = "SELECT DISTINCT Resource.ID_RESOURSE ,Resource.name FROM Resource INNER JOIN Resourse_Sector ON  Resourse_Sector.PK_Resourse = Resource.ID_RESOURSE INNER JOIN Sector_Hospital ON Sector_Hospital.ID_SH = Resourse_Sector.PK_SH WHERE Sector_Hospital.PK_Hospital = $hospitalId " . $condition;
$data = query($sql);
echo json_encode($data);
