<?php
include("connect.php");
$id = $_POST['id'];

$stmt = $conn->prepare("SELECT user.Name as name, rate as rating,`comment` FROM product JOIN rate USING(p_id) JOIN user USING(Email) WHERE p_id = ?");
$stmt->bind_param("i",$id);
$stmt->execute();

$r = $stmt->get_result();
$data = [];
while ($row=$r->fetch_assoc()) {
    $data[]=$row;
}
echo json_encode($data);

?>