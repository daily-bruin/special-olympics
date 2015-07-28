$(document).ready(function() {
	$('aside').hide();
	var originalContentHeight = $('nav').height() + 20;
	$('#landing-img').css('margin-top', originalContentHeight + 50);
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
	
	// nav auto hide
	
	var mywindow = $(window);
	var mypos = mywindow.scrollTop();
	var up = false;
	var newscroll;
	mywindow.scroll(function () {
	    newscroll = mywindow.scrollTop();
	    if (newscroll > mypos && !up) {
	        $('nav').stop().slideToggle();
	        up = !up;
	        console.log(up);
	    } else if(newscroll < mypos && up) {
	        $('nav').stop().slideToggle();
	        up = !up;
	    }
	    mypos = newscroll;
	});
});