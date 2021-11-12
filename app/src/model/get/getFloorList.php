<?php
include("./../connection.php");
$sql = "SELECT Tier_Sector.ID_tier, Tier_Sector.tier FROM Tier_Sector INNER JOIN Sector_Hospital ON Sector_Hospital.ID_SH=Tier_Sector.PK_SH where Sector_Hospital.PK_Hospital='1'";
$data = query($sql);
echo json_encode($data);