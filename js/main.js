$(document).ready(function() {
	$('aside').hide();
	$( 'nav' ).hover(
	  function() {
	    $( '#nav-sport-link' ).hover(
	      function() {
	      	$('#venueNames').hide();
	        $('#sportNames').show().slideDown();
	      }
	    );
	    $( '#nav-venue-link' ).hover(
	      function() {
	      	$('#sportNames').hide();
	        $('#venueNames').show().slideDown();
	      }
	    );
	  }, function() {
	    $('#sportNames').hide();
	    $('#venueNames').hide();
	  }
	);
	
});