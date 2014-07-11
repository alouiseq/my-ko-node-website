// contacts module
var contactsModule = (function () {
  return {
    sendemail: function () {
      $("#msg").text(msg);

      // Handle form object
      $('form').on('submit', function() {
	$.post($(this).attr('action'), $(this).serialize(), function(response) {
	  $('form').children('.field').val('');
	  if (!response.msg) {
	    alert('Messaged sent!');
	  }
	  else {
	    alert('Error sending message: ' + response.msg);
	  }
	});
	return false;
      });
    }
  };
})();

// Usage:
contactsModule.sendemail;
