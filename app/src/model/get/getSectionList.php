<?php
include("./../connection.php");
session_start();
$hospitalId = $_SESSION['ID_HOSPITAL'];
$sql = "SELECT Sector.ID_SECTOR, Sector.name FROM Sector_Hospital INNER JOIN Sector ON Sector.ID_SECTOR=Sector_Hospital.PK_Sector WHERE Sector_Hospital.PK_Hospital=$hospitalId";
$data = query($sql);
echo json_encode($data);
