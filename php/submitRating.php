<?php
include("connect.php");

$token = $_POST['token'];
$id = $_POST['id'];
$email = $_POST['email'];
$rate = $_POST['rate'];
$comment = $_POST['comment'];

$stmt=$conn->prepare("INSERT INTO rate(email,p_id,rate,`comment`) SELECT ?,?,?,? WHERE EXISTS (SELECT * FROM user_tokens WHERE email = ? AND token = ?) ON DUPLICATE KEY UPDATE rate = ?,`comment`=?");
$stmt->bind_param("siisssis",$email,$id,$rate,$comment,$email,$token,$rate,$comment);
if($stmt->execute()){
    echo "success";
}else{
    echo "fail";
}
?>