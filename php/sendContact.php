<?php
include("connect.php");

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$stmt = $conn->prepare("INSERT INTO contactUs(name,number,message) VALUES(?,?,?)");
$stmt->bind_param("sss",$name,$email,$message);

if($stmt->execute()){
    echo "We got your message";
}else{
    echo "Fail";
}
?>