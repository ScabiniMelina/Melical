<?php
include("./../connection.php");
$sql = "SELECT Sector_Hospital.ID_SH, Sector.name FROM Sector_Hospital INNER JOIN Sector ON Sector.ID_SECTOR=Sector_Hospital.PK_Sector WHERE Sector_Hospital.PK_Hospital='1'";
$data = query($sql);
echo json_encode($data);