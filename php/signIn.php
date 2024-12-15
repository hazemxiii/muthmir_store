<?php
include("connect.php");

function generateToken($length = 32) {
    return bin2hex(random_bytes($length / 2)); // Generates a secure random token
}

$email = $_POST['email'];
$pass = $_POST['password'];

$stmt = $conn->prepare("SELECT * FROM user WHERE email = ? AND password = ?");
$stmt->bind_param("ss",$email,$pass);
$stmt->execute();

$r = $stmt->get_result();
if($r->num_rows==1){
    $stmt = $conn->prepare("DELETE FROM user_tokens WHERE email = ?");
    $stmt->bind_param("s",$email);

    if($stmt->execute()){

        $token = generateToken();
        $expiry = date('Y-m-d H:i:s', strtotime('+1 hour'));
        
        $stmt = $conn->prepare("INSERT INTO user_tokens(email,token,expires_at) VALUES(?,?,?)");
        $stmt->bind_param("sss",$email,$token,$expiry);
        
        if($stmt->execute()){
            echo $token;
        }else{
            echo "fail";
        }
    }else{
        echo "fail";
    }
}else{
    "fail: Invalid Credentials";
}
?>