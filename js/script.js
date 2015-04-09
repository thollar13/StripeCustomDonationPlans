$(document).ready(function() {

  /// set publishable key
  Stripe.setPublishableKey('PUBLISHABLE TEST KEY');

  function stripeResponseHandler(status, response) {
      if (response.error) {
          $('.submit-button').removeAttr("disabled");
          $(".payment-errors").html(response.error.message);
      } else {
          var form$ = $("#payment-form");
          var token = response['id'];
          form$.append("<input type='hidden' name='stripeToken' value='" + token + "' />");
          form$.get(0).submit();
      }
  }

  /// create token with charge amount and pass to handler to append actual token to form
  $("#payment-form").submit(function(event) {
      $('.submit-button').attr("disabled", "disabled");
      var chargeAmount = parseFloat($('.payment-amount').val())*100; 
      Stripe.createToken({
          number: $('.card-number').val(),
          cvc: $('.card-cvc').val(),
          exp_month: $('.card-expiry-month').val(),
          exp_year: $('.card-expiry-year').val()
      }, chargeAmount, stripeResponseHandler);
      return false; 
  });

  /// Monthly plan donation button clicked
  $('.monthlyoption').click(function(e) {
    e.preventDefault();
    /// get amount
    var amount = $('.monthly-amount').val();
    var payAmount = $('.payment-amount');
    /// change form action route to actual plan file to make the correct charge
    $('#payment-form').attr('action', 'http://stripe.dev/plans/'+amount+'charge.php');

    /* hide amount and insert text to describe the plan being subscribed to
       also prevents users from changing the amount and prevents and error from occuring on submission
    */
    payAmount.val(amount).hide();
    payAmount.siblings('label').html('You are subscribing to a $'+amount+' monthly donation plan.').css({'text-align' : 'center', 'margin-top' : '25px'});
    $('.donation-wrap').show();
  });

  /// Custom amount donation button clicked
  $('.customoption').click(function(e) {
    e.preventDefault();
    /// get amount
    var amount = $('.custom-amount').val();
    if(amount != '' || amount > 5) {
      $('.payment-amount').val(amount).show();
      $('.payment-amount').siblings('label').html('Amount ($)');

      /// change form action route to actual plan file to make the correct charge
      $('#payment-form').attr('action', 'http://stripe.dev/charge.php');
      $('.donation-wrap').show();
    } else {
      $('.erroramount').html('You must enter a valid amount and must be more than $5');
    }
  });

  /// Close donation button
  $('.close-donation-popup').click(function() {
    $('.donation-wrap').hide();
  });
});