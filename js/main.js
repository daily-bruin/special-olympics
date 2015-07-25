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
	    /*$( '#nav-venue-link' ).hover(
	      function() {
	      	$('#sportNames').slideUp();
	        $('#venueNames').slideDown();
	      }
	    );*/
	  }, function() {
	    $('#sportNames').slideUp();
	    $('#venueNames').slideUp();
	  }
	);
	// GOOGLE SPREADSHEET JS
	//source file is https://docs.google.com/a/media.ucla.edu/spreadsheets/d/1c5UOYAG9b-e9rJ8CXAgXmmeAxpu0gD9-t2sFZe0fx3I/edit?usp=sharing
	var spreadsheetID = "1c5UOYAG9b-e9rJ8CXAgXmmeAxpu0gD9-t2sFZe0fx3I";
	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
	var oldDanceMarathonURL= "https://spreadsheets.google.com/feeds/list/1gJQIn0TvEJ0c-R7Csntfwmu3qwTzqAYJEImdZ720jeQ/od6/public/values?alt=json";
	
	var sports = ["gymnastics", "judo", "soccer", "softball", "tennis", "volleyball", "opening"];

	// set up nav bar links to reference bottom posts and
	// make classes for all sport categories in #content
	for (var i = 0; i < sports.length; i++) {
		$('#content').append('<div id="' + sports[i] + 'group"></div>');
	};

	// get spreadsheet JSON
	$.getJSON(url, function(data) {

	  var entry = data.feed.entry.reverse();	// get array of entries
	  var num = 0;
	  $(entry).each(function(){

	  	// give each post proper class name depending on sport category
	  	var sportCategory = this.gsx$sportcategory.$t;
	  	var newPost = '<div class="' + sportCategory + ' post" id="t' + num + '"><h2>' + this.gsx$title.$t + '</h2><p>' 
	  					+ this.gsx$content.$t + '</p></div>';
	    $('#' + sportCategory + 'group').append(newPost);

	    if(this.gsx$type.$t === "article")
	    {
	    var img1="";
	  	var img2="";
	  	var positionName="";
	  	var byline="";
	    	/*
	    		img_code = '<div class="thumbnail with-caption col-sm-12">' + 
								   '<img src="' + entry.gsx$featured.$t + '" class="img-responsive" />' + 
								   '<div class="caption">' + 
								   '	<p class="caption_content">'+ entry.gsx$caption.$t +'</p>' + 
							   	   '</div>' + 
								   '</div> <br />'*/
			if(this.gsx$author != null)
			{
				byline="<h8 class="+'"byline"'+">"+this.gsx$author.$t+"</h8>";
				positionName='#t'+ num + '.'+ sportCategory+ '.post';
	    		$(positionName+' h2').after(byline);
	    		console.log(this.gsx$author.$t);
			}
	    	if(this.gsx$link1 != null)
	    	{
	    		img1 = '<div class="thumbnail with-caption col-sm-12">' + 
	    		'<img src="' + this.gsx$link1.$t +'" />'+'<div class="caption">' + 
								   '	<p class="caption_content">'+ this.gsx$caption1.$t +'</p>' + 
							   	   '</div>' + '</div> ';
				positionName='#t'+ num + '.'+ sportCategory+ '.post';
	    		$(positionName+' h8').after(img1);
	    	}
	    	if(this.gsx$link2 != null)
	    	{
	    		var numPTags = $('#t' + num + ' p').length / 2;
	    		var stringNum = num.toString();
	    		img2 = '<div class="thumbnail with-caption col-sm-12">' + '<img src="' + this.gsx$link2.$t + '" />'+'</div> ';
	    		$(positionName+' p:nth-child(' + numPTags.toString() + ')').after(img2);
	    	}
	    }

	  });
	  num++;

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


