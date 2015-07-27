$(document).ready(function() {
	$('aside').hide();
	var originalContentHeight = $('nav').height() + 20;
	$('#content').css('margin-top', originalContentHeight);
	// NAV JS
	$('aside').hide();
	$('#nav-venue-link').on('click', function () {
	        if ($('#venueNames').is(':visible')) {
	            $('#venueNames').slideUp();
	        } else {
	            $('#venueNames').slideDown();
	        };
	    });

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