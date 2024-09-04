<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];

  $to = "abdulmustafa124@gmail.com"; // Replace with your Gmail address
  $subject = "New Contact Form Submission";
  $body = "Name: $name\n\nEmail: $email\n\nMessage: $message";

  if (mail($to, $subject, $body)) {
    echo "Thank you for your submission!";
  } else {
    echo "There was an error sending the email.";
  }
}
?>
