<?php
  require_once('./config.php');

  $token  = $_POST['stripeToken'];
  $amount = (float)$_POST['amount'] * 100;

  $customer = \Stripe\Customer::create(array(
      'email' => 'customer@example.com',
      'card'  => $token
  ));

  $charge = \Stripe\Charge::create(array(
      'customer' => $customer->id,
      'amount'   => $amount,
      'currency' => 'usd'
  ));

  /// this is the redirect to whatever page 
  header('Location: http://stripe.com');
?>