<?php
include("connect.php");
$id = $_POST['id'];

$stmt = $conn->prepare("SELECT name,IFNULL(AVG(rate),0) AS avgRating,price,Description as describtion,Picture AS imageUrl FROM product LEFT JOIN rate USING(p_id) WHERE p_id = ?");
$stmt->bind_param("i",$id);
$stmt->execute();

$r = $stmt->get_result();
echo json_encode($r->fetch_assoc());

?>