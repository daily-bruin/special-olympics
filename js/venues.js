$(document).ready(function() {
	$('aside').hide();
	var originalContentHeight = $('nav').height() + 20;
	$('#content').css('margin-top', originalContentHeight);
	// NAV JS
	$('aside').hide();
	$( 'nav' ).hover(
	  function() {
	    $( '#nav-sport-link' ).hover(
	      function() {
	      	$('#venueNames').slideUp();
	        $('#sportNames').slideDown();
	      }
	    );
	    $( '#nav-venue-link' ).hover(
	      function() {
	      	$('#sportNames').slideUp();
	        $('#venueNames').slideDown();
	      }
	    );
	  }, function() {
	    $('#sportNames').slideUp();
	    $('#venueNames').slideUp();
	  }
	);
});