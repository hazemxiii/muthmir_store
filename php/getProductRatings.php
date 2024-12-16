<?php
include("connect.php");
$id = $_POST['id'];
$email = $_POST['email'];

$stmt = $conn->prepare("SELECT user.Name as name, rate as rating,`comment` FROM product JOIN rate USING(p_id) JOIN user USING(Email) WHERE p_id = ? AND user.email != ?");
$stmt->bind_param("is",$id,$email);
$stmt->execute();

$r = $stmt->get_result();
$data = [];
while ($row=$r->fetch_assoc()) {
    $data[]=$row;
}
$stmt = $conn->prepare("SELECT user.Name as name, rate as rating,`comment` FROM product JOIN rate USING(p_id) JOIN user USING(Email) WHERE p_id = ? AND user.email = ?");
$stmt->bind_param("is",$id,$email);
$stmt->execute();

$r = $stmt->get_result();

$map = array();
$map['data'] = $data;
$map['user'] = $r->fetch_assoc();

echo json_encode($map);

?>