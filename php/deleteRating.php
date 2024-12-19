<?php
include("connect.php");

$token = $_POST['token'];
$id = $_POST['id'];
$email = $_POST['email'];

$stmt=$conn->prepare("DELETE FROM rate WHERE EXISTS (SELECT * FROM user_tokens WHERE email = ? AND token = ?) AND p_id = ?");
$stmt->bind_param("ssi",$email,$token,$id);
if($stmt->execute()){
    echo "success";
}else{
    echo "fail";
}
?>