<?php
session_start();
include("./../connection.php");
$sector =  setSelectValue($_GET['sector']);
$condition =  " ";
if (isset($sector)) {
    $condition .= " AND Sector_Hospital.PK_Sector = " . $sector;
}
$hospitalId = $_SESSION['ID_HOSPITAL'];

$sql = "SELECT DISTINCT  Tier_Sector.tier, Tier_Sector.tier FROM Tier_Sector INNER JOIN Sector_Hospital ON Sector_Hospital.ID_SH=Tier_Sector.PK_SH where Sector_Hospital.PK_Hospital=$hospitalId" . $condition;
$data = query($sql);
if (!isset($data)) {
    $data = (object) array();
}
echo json_encode($data);
