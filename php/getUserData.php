<?php 
include("./connect.php");

$email = $_POST['email'];
$token = $_POST['token'];

$stmt = $conn->prepare("SELECT name,profile_picture FROM user JOIN user_tokens USING(email) WHERE user_tokens.email=? AND token = ?");
$stmt->bind_param("ss",$email,$token);
$stmt->execute();

$r = $stmt->get_result();
// print_r($r->fetch_assoc());
echo json_encode($r->fetch_assoc());
?>