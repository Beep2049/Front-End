<?php

session_start();

require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


//Parameters
$errors = [];
$formData = $_POST;
$success = false;


//Check if form was submitted
if($_SERVER['REQUEST_METHOD'] === 'POST'){

    // Form Data
    $fullName = sanitizeInput($_POST['full-name'] ?? '');
    $business = sanitizeInput($_POST['business'] ?? '');
    $email = sanitizeInput($_POST['email'] ?? '');
    $phone =  sanitizeInput($_POST['client-phone'] ?? '');
    $subject = sanitizeInput($_POST['subject'] ?? '');
    $message = sanitizeInput($_POST['message'] ?? '');

    //Error Checking
    $errors = validateForm($fullName, $email, $subject, $message);
   

    //Sending mail if no errors
    if(empty($errors)){
        $mailResult = sendEmail($fullName, $business,$email, $phone, $subject, $message);

        if($mailResult['success']){
            $success = true;
            $formData = [];
        } else{
            $errors[] = $mailResult['error'];
        }
    }    
}

require 'contact.php';

//Functions that make this shit work
function sanitizeInput($data){
    return trim(strip_tags($data ?? ''));
}

function validateForm($fullName, $email, $subject, $message){
    $errors = [];

    //Validating each entry
    if(empty($fullName)){
        $errors[] = 'Full name is required';
    }elseif(strlen($fullName) < 5){
        $errors[] = "Please enter your full name (min. 5 characters)";
    }

    if(empty($email)){
        $errors[] = 'Email address is required';
    }elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $errors[] = 'Please enter a valid email address';
    }

    if(empty($subject) || empty($message)){
        $errors[] = 'Both subject and message is required';
    }elseif(strlen($message) < 10){
        $errors[] = 'Message must be longer than 10 characters';

    }

    return $errors;
}
function sendEmail($fullName, $business, $email, $phone, $subject, $message){
    $mail = new PHPMailer(true);

    //Email Templates
    $messageYou = <<<EMAIL
A new contact form was submitted:

Full Name: $fullName
Business: $business
Email: $email
Phone: $phone
Subject: $subject

Message: 
$message
EMAIL;

    $messageClient = <<<EMAIL
Dear $fullName,

Thank you for reaching out to us here at Intrinsic. We have received your message regarding:


"$subject"

One of our staff will get back to you within a 24-48 Hour window to discuss your request

Best Regards, 
The Intrinsic Team
EMAIL;

    try{
        //Server Config
        $mail->isSMTP();
        $mail->Host = 'localhost';
        $mail->SMTPAuth = false;
        $mail->Port = 25;
        $mail->CharSet = 'UTF-8';

        //Send Email to Me
        $mail->setFrom($email, $fullName);
        $mail->addAddress('support@intrinsicgd.com');
        $mail->addReplyTo($email, $fullName);
        $mail->Subject = "New Contact Form: $subject";
        $mail->Body = $messageYou;
        $mail->send();

        //Send Email to Client
        $mail->clearAllRecipients();
        $mail->setFrom('support@intrinsicgd.com', 'Intrinsic');
        $mail->addAddress($email, $fullName);
        $mail->Subject = "Thank you for contacting Intrinsic";
        $mail->Body = $messageClient;
        $mail->send();

        return ['success' => true];

    }catch(Exception $e){
        return [
            'success' => false,
            'error' => "Message could not be sent. Error: {$mail->ErrorInfo}"
        ];
    }
}
?>