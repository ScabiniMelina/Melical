<?php
include("./../connection.php");
session_start();
$sql = "SELECT Sector.ID_SECTOR, Sector.name FROM `Sector_Hospital`INNER JOIN Hospital ON Hospital.ID_HOSPITAL=Sector_Hospital.PK_Hospital INNER JOIN Sector ON Sector.ID_SECTOR=Sector_Hospital.PK_Sector WHERE PK_HOSPITAL =" . $_SESSION['ID_HOSPITAL'];
$data = query($sql);
echo json_encode($data);
