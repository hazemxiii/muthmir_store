<?php

include("connect.php");

$name = $_POST['name'];
$pass = $_POST['password'];
$email = $_POST['email'];

$stmt = $conn->prepare("SELECT email FROM user WHERE email = ?");
$stmt->bind_param("s",$email);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows>0){
    echo "Duplicated email";
    $stmt->close();
    $conn->close();
    return;
}

$stmt = $conn->prepare("INSERT INTO user(email,name,password) values (?,?,?)");
$stmt->bind_param("sss", $email, $name,$pass);

$stmt->execute();

$stmt->close();
$conn->close();
?>