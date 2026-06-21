<?php
$subject = 'New Contact Message';
$to = 'contact@ztc.tn';

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$msg = isset($_POST['message']) ? trim($_POST['message']) : '';

if ($name === '' || $email === '' || $phone === '' || $msg === '' || strpos($email, '@') === false) {
    echo 'failed';
    exit;
}

$email_from = $name . ' ' . '<' . $email . '>';

$headers = "MIME-Version: 1.1";
$headers .= "Content-type: text/html; charset=iso-8859-1";
$headers .= "From: " . $name . '<' . $email . '>' . "\r\n";
$headers .= "Return-Path:" . "From:" . $email;

$message = '';
$message .= 'Name : ' . $name . "\n";
$message .= 'Email : ' . $email . "\n";
$message .= 'Phone : ' . $phone . "\n";
$message .= 'Message : ' . $msg;

if (@mail($to, $subject, $message, $email_from)) {
    echo 'sent';
} else {
    echo 'failed';
}
?>
