<?php
  require_once('../config.php');

  $token  = $_POST['stripeToken'];
  
  $customer = \Stripe\Customer::create(array(
      'email' => 'customer@example.com',
      'plan' => '50charge',
      'card'  => $token
  ));

  /// this is the redirect to whatever page 
  header('Location: http://stripe.com');
?>