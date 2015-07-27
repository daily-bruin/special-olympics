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
			$('#sportNames').slideUp();
		});
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
	
	var sports = ["opening", "gymnastics", "judo", "soccer", "softball", "tennis", "volleyball"];

	// set up nav bar links to reference bottom posts and
	// make classes for all sport categories in #content
	for (var i = 0; i < sports.length; i++) {
		$('#content').append('<div id="' + sports[i] + 'group"></div>');
	};

	// get spreadsheet JSON
	$.getJSON(url, function(data) {

	  data = clean_google_sheet_json(data);
	  var entry = data.reverse();	// get array of entries
	  var num = 0;
	  
	  

	  $(entry).each(function(){

	  	// give each post proper class name depending on sport category
	  	var sportCategory = this.sportcategory;

	  	var postText = this.content;
	  	postText = postText.trim();
	  	var re_trimtext = new RegExp('[\r\n]+', 'g');
	  	postText = postText.length>0?'<p>'+postText.replace(re_trimtext,'</p><p>')+'</p>':null;

	  	var newPost = '<div class="' + sportCategory + ' post" id="t' + num + '"><h2>' + this.title + '</h2>' 
	  					+ postText + '</div>';

	    $('#' + sportCategory + 'group').append(newPost);

	    if(this.type === "article")
	    {
	    var img1="";
	  	var img2="";
	  	var positionName='#t'+ num + '.'+ sportCategory+ '.post';
	  	var byline="";
	    	
			if(this.author)
			{
				byline="<h8 class="+'"byline"'+">"+this.author+"</h8>";
	    		$(positionName+' h2').after(byline);
			}
	    	if(this.link1 != "")
	    	{
	    		img1 = '<div class="thumbnail with-caption col-sm-12">' + 
	    		'<img src="' + this.link1 +'" />'+'<div class="caption">' + 
								   '	<p class="caption_content">'+ this.caption1 +'</p>' + 
							   	   '</div>' + '</div> ';
	    		$(positionName+' h8').after(img1);
	    	}
	    	if(this.link2 != "")
	    	{
	    		var numPTags = $('#t' + num + ' p').length / 2;
	    		numPTags = Math.floor(numPTags);
	    		var stringNum = num.toString();
	    		img2 = '<div class="thumbnail with-caption col-sm-12">' + '<img src="' + this.link2 + '" />'+'</div> ';
	    		//$(positionName+' p:nth-child(' + numPTags.toString() + ')').after(img2);
	    		$(positionName+' p').eq(numPTags).after(img2);
	    	}
	    }
	    num++;
	  });
	  

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


function clean_google_sheet_json(data){
	var formatted_json = [];
	var elem = {};
	var real_keyname = '';
	$.each(data.feed.entry, function(i, entry) {
		elem = {};
		$.each(entry, function(key, value){
			// fields that were in the spreadsheet start with gsx$
			if (key.indexOf("gsx$") == 0) 
			{
				// get everything after gsx$
				real_keyname = key.substring(4); 
				elem[real_keyname] = value['$t'];
			}
		});
		formatted_json.push(elem);
	});
	return formatted_json;
}