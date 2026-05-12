<?php

session_start();

$errors = [];
$success = false;
$formData = $_POST;

// Check if form was submitted
if($_SERVER['REQUEST_METHOD'] === 'POST'){

    // Form Data
    $fullName = isset($_POST['full-name']) ? trim(strip_tags($_POST['full-name'])): '';
    $business = isset($_POST['business']) ? trim(strip_tags($_POST['business'])): '';
    $email = isset($_POST['email']) ? trim(strip_tags($_POST['email'])): '';
    $phone = isset($_POST['client-phone']) ? trim(strip_tags($_POST['client-phone'])): '';
    $subject = isset($_POST['subject']) ? trim(strip_tags($_POST['subject'])): '';
    $message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])): '';

    // Validate Required Fields
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

    if(empty($subject)){
        $errors[] = 'Subject is required';
    }

    if(empty($message)){
        $errors[] = 'Message is required';
    }elseif(strlen($message) < 10){
        $errors[] = 'Message must be longer than 10 characters';
    }

    // Send to business mail if no errors
    if(empty($errors)){
        
         // Mail to business e-mail
        $toYou = "support@intrinsicgd.com";
        $subjectYou = "New Contact Form Submission: $subject";
        $messageYou = "A new contact form was submitted:\n\n"  .
                       "Full Name: $fullName\n"  .
                       "Business: $business\n"  .
                       "Email: $email\n"  .
                       "Phone: $phone\n"  .
                       "Subject: $subject\n\n"  .  
                       "Message: \n$message";

        // Auto Reply
        $headersYou = "From: $fullName <$email>" . "\r\n";
        $headersYou .= "Reply-To: $email" . "\r\n";
        $headersYou .= "X-Mailer: PHP/" . phpversion(); 

        $toClient = $email;
        $subjectClient = "Thank you for contacting Intrinsic";
        $messageClient = "Dear $fullName,\n\n" .
                         "Thank you for reaching out to us here at Intrinsic. We have received your message regarding:\n\n"  .
                         "\ $subject\n\n" .
                         "One of our staff will get back to you within a 24-48 Hour window to discuss your request\n\n"  .
                         "Best Regards, \n"  .
                         "The Intrinsic Team";

        $headersClient = "From: Intrinsic <support@intrinsicgd.com>" . "\r\n";
        $headersClient .= "Reply-To: support@intrinsicgd.com" . "\r\n";

        // Sending the mail
        $mailToYou = mail($toYou, $subjectYou, $messageYou, $headersYou);
        $mailToClient = mail($toClient, $subjectClient, $messageClient, $headersClient);

        if($mailToYou && $mailToClient){
            $success = true;
            // Clear form data after successful send
            $formData = [];
        } else {
            $errors[] = "Sorry, there was a problem sending your message. Please try again later.";
        }
    } 
}

include 'contact.php';
?>