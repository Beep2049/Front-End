<?php
// Variables passed from contact.php: $formData, $errors, $success
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact</title>
    <link rel="stylesheet" href="/intrinsic_website_v2/css/global_style.css">
    <link rel="stylesheet" href="/intrinsic_website_v2/css/contact_style.css">
    <link rel='stylesheet' href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>
    <div class="navbar-spacer"></div>
    <main class="main-page">
        <nav class="navbar">
            <div class="nav-links">
                <a href="/intrinsic_website_v2/html/index.html" class="navlink">Home</a>
                <a href="/intrinsic_website_v2/html/index.html#About" class="navlink">About</a>
                <a href="/intrinsic_website_v2/html/index.html#Services" class="navlink">Services</a>
                <a href="/intrinsic_website_v2/html/pricing.html" class="navlink">Pricing</a>
                <a href="contact.php" class="navlink">Contact</a>
            </div>

            <div class="nav-contact">
                <p id="nav-phone" class="navlink">+1-305-498-5503</p>
                <a href="mailto:support@intrinsicgd.com" class="navlink">support@intrinsicgd.com</a>
            </div>
        </nav>
        <section class="main-section" id="form-section">
            <video class="header-video" id="header-video" autoplay muted loop>
                <source src="/intrinsic_website_v2/pics/b-roll.mp4">
                Your Browser Does Not Support The Video Tag
            </video>
            <div class="form-content" id="form-content">
                <div class="content-container" id="content-container">
                    <h2 class="section-header" id="form-header">We're Here To Help </h2>
                    <p class="section-text" id="contact-form-text">Fill out our form and will reach out as soon as possible.</p>
                </div>
                <div class="contact-form-container">
                    <?php if($success): ?>
                        <div class="message-box success-box">
                            <p class="success">
                                Thank you! Your message has been sent. We'll get back to you shortly
                            </p>
                        </div>
                    <?php endif; ?>

                    <?php if(!empty($errors)): ?>
                        <div class="message-box error-box">
                            <ul class="error-list">
                                <?php foreach($errors as $error): ?>
                                    <li class="error"><?php echo htmlspecialchars($error); ?></li>
                                    <?php endforeach; ?>
                            </ul>
                        </div>
                    <?php endif; ?>
                    
                    <form method="post" action="contact_form.php" class="contact-form">

                        <label for="name" >Full Name: (Required)</label>
                        <input type="text" name="full-name" id="full-name" minlength= "4" maxlength="100" placeholder="Your Full Name" required value="<?php echo isset($formData['full-name']) ? htmlspecialchars($formData['full-name']) : ''; ?>" >

                        <label for="business" >Business Name (if applicable): </label>
                        <input type="text" name="business" id="business"  minlength= "2" maxlength="100" placeholder="Your Buisness" value="<?php echo isset($formData['business']) ? htmlspecialchars($formData['business']) :  ''; ?>">

                        <label for="email" >Email: (Required)</label>
                        <input type="email" name="email" id="email" placeholder="Your Email" required value="<?php echo isset($formData['email']) ? htmlspecialchars($formData['email']) : ''; ?>">

                        <label for="client-phone" >Phone Number (optional):</label>
                        <input type="tel" name="client-phone" id="client-phone" placeholder="Your Phone Number" value="<?php echo isset($formData['client-phone']) ? htmlspecialchars($formData['client-phone']) : ''; ?>">

                        <label for="subject" >Subject: (Required)</label>
                        <input type="text" name="subject" id="subject" placeholder="Website, Product Launch, Maintenance?" required value="<?php echo isset($formData['subject']) ? htmlspecialchars($formData['subject']) : ''; ?>">

                        <label for="message" >Message: (Required)</label>
                        <textarea type="text" name="message" id="message" minlength= "10" maxlength="750" placeholder="Let us know how we can help you...." required><?php echo isset($formData['message']) ? htmlspecialchars($formData['message']) : ''; ?></textarea>

                        <button type="submit" id="submit-button">Submit</button>
                    </form>
                </div>
                
            </div>

        </section>
         <section class="main-section" id="Contact">
            <h2 class="section-header" id="contact-header">Contact: </h2>
            </h4>
            <div class="contact-container">
                <div class="contact-subsection" id="contact-info">
                    <h5 class="subsection-header" id="contact-info-header">Info:</h5>
                    <p class="subsection-text" id="phone-number">Phone: +1 (305)-498-5503</p>
                    <p class="subsection-text" id="email"><a href="mailto:support@intrinsicgd.com" id="maillink"> Email: support@intrinsicgd.com</a></p>
                </div>

                <div class="contact-subsection" id="socials">
                    <h5 class="subsection-header" id="social-header">Socials:</h5>
                    <div class="social-links-container">
                        <a href="facebook" class="social-link" target="_blank">
                            <i class="fa-brands fa-facebook" id="Facebook"></i>
                        </a>
                        <a href="instagram" class="social-link" target="_blank">
                            <i class="fa-brands fa-instagram" id="Instagram"></i>
                        </a>
                        <a href="x.com" class="social-link" target="_blank">
                            <i class="fa-brands fa-x-twitter" id="Xcom"></i>
                        </a>
                        <a href="linkedin" class="social-link" target="_blank">
                            <i class="fa-brands fa-linkedin" id="Linkedin"></i>
                        </a>
                    </div>
                </div>

                <div class="contact-subsection" id="hours">
                    <h5 class="subsection-header" id="hours-header">Hours:</h5>
                    <p class="hours-info" id="weekdays">Monday - Friday: 8am - 8pm</p>
                    <p class="hours-info" id="saturday">Saturday: 10am - 4pm</p>
                    <p class="hours-info" id="sunday">Sunday: CLOSED</p>
                </div>
            </div>
        </section>
    </main>
    <footer class="copyright">Copyright @ 2025. All Rights Reserved</footer>
</body>
</html>