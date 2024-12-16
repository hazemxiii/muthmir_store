<?php
include("connect.php");

$stmt =$conn->prepare("SELECT p_id AS id,picture AS `image`,price,name,'img' AS alt,'category' AS category,description FROM product");
$stmt->execute();
$r = $stmt->get_result();

$data = [];
while ($row = $r->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data);
?>