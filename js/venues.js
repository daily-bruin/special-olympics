$(document).ready(function() {
	$('aside').hide();
	var originalContentHeight = $('nav').height() + 20;
	$('#content').css('margin-top', originalContentHeight);
	// NAV JS
	$('aside').hide();
	$( 'nav' ).hover(
	  function() {
  	  	$('nav').click(function() {
  	  		console.log("slide up");
  			$('#venueNames').slideUp();
  		});
	    $( '#nav-sport-link' ).hover(
	    function() {
	      	$('#venueNames').slideUp();
	      }
	    );
	    $( '#nav-venue-link' ).hover(
	      function() {
      	  	$('#venueNames').click(function() {
      			$('#venueNames').slideUp();
      		});
	      	$('#sportNames').slideUp();
	        $('#venueNames').slideDown();
	      }
	    );
	  }, function() {
	    $('#sportNames').slideUp();
	    $('#venueNames').slideUp();
	  }
	);

	// scrolling speed
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top - originalContentHeight - 90
	    }, 1000, 'swing', function () {
	        window.location.hash = target;
	    });
	});
});