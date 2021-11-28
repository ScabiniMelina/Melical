<?php
session_start();
include("./../connection.php");
$sector =  setSelectValue($_GET['sector']);
$tier =  setSelectValue($_GET['tier']);
$room =  setSelectValue($_GET['room']);
$condition =  " ";
if (isset($sector)) {
    $condition .= " AND Sector_Hospital.PK_Sector = " . $sector;
}
if (isset($tier)) {
    $condition .= " AND Tier_Sector.tier = " . $tier;
}
if (isset($room)) {
    $condition .= " AND  Room.ID_room = " . $room;
}
if (isset($area)) {
    $condition .= " AND Room.type = " . $area;
}
$hospitalId = $_SESSION['ID_HOSPITAL'];
$sql = "SELECT Room.ID_room,Room.number FROM Tier_Sector INNER JOIN Sector_Hospital ON Sector_Hospital.ID_SH=Tier_Sector.PK_SH  INNER JOIN Room ON Room.PK_TS = Tier_Sector.ID_tier WHERE Sector_Hospital.PK_Hospital=$hospitalId" . $condition;
$data = query($sql);
if (!isset($data)) {
    $data = (object) array();
}
echo json_encode($data);
