<?php
require_once('stripe/init.php');

$stripe = array(
  "secret_key"      => "SECRET TEST KEY",
  "publishable_key" => "PUBLISHABLE TEST KEY"
);

\Stripe\Stripe::setApiKey($stripe['secret_key']);
?>