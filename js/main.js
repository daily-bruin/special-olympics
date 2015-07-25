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
	  	var newPost = '<div class="' + sportCategory + ' post" id="t' + num + '"><h3>' + this.gsx$title.$t + '</h3><p>' 
	  					+ this.gsx$content.$t + '</p></div>';
	    $('#' + sportCategory + 'group').append(newPost);

	    if(this.gsx$type.$t === "article")
	    {
	    	if(this.gsx$link1 != null)
	    	{
	    		var img1 = '<img src="' + this.gsx$link1.$t + '" />';
	    		$('h3').after(img1);
	    	}
	    	if(this.gsx$link2 != null)
	    	{
	    		var stringNum = num.toString();
	    		var img2 = '<img src="' + this.gsx$link2.$t + '" />';
	    		$('p:nth-child(8)').after(img2);
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
	
	
			
	/*$.getJSON(url , function (data) {	
				$.each(data.feed.entry.reverse(), function(i,entry) {
	           		/*var append = '<section id="anchor'+i+'"class="transition">'
	           		+'<div id="container" style="height: 100%; overflow:hidden; ">'
	           		+'<video muted id="video'+i+'" preload="auto" style="width: 100%; overflow:hidden;" loop="loop">' 
	           		+ '<source src="'+entry.gsx$link.$t+'" type="video/mp4">'
	  				+'bgvideo'
	  				+'</video></div></section>'
						$('div#content').append(append); 
					   index.push(i);
					} 	*/	



					/*var time = new Date (entry.gsx$datetime.$t);
					if(i==0)
					{
						//find the latest time to start out with
						for(j=1;j<timeArray.length;j++)
						{
							if(time <= new Date(timeArray[j-1]) && time >= new Date(timeArray[j]))
							{
								k=j-1;
								var newLink = ' <li><a href="#anchor'+i+'">'+timeName[k]+'</a></li>'
								$('ul.nav').append(newLink); 
								cutoff=new Date(timeArray[j]);
								k++;j++;
								break;
							}
						}
					}

					else if (time <= cutoff){	
						var newLink = ' <li><a href="#anchor'+i+'">'+timeName[k]+'</a></li>'
						$('ul.nav').append(newLink); 
						cutoff=new Date(timeArray[j]);
						j++;k++;
					}

					if (entry.gsx$type.$t == "transition") {
					/*	var append = '<section id="anchor'+i+'"class="transition">'
						+'<div id="container" style="height: 100%; overflow:hidden; ">'
	       			+'<iframe id="player" style="width:100%; height:100%;" '
	       			+'src="https://www.youtube.com/embed/'+entry.gsx$link.$t
	       			+'?enablejsapi=1&amp;autoplay=1&amp;controls=0&amp;loop=1&amp;showinfo=0&amp;modestbranding=1&amp;disablekb=1"'
	           	+'frameborder="0" allowfullscreen></iframe></div></section>';*/
	           		/*var append = '<section id="anchor'+i+'"class="transition">'
	           		+'<div id="container" style="height: 100%; overflow:hidden; ">'
	           		+'<video muted id="video'+i+'" preload="auto" style="width: 100%; overflow:hidden;" loop="loop">' 
	           		+ '<source src="'+entry.gsx$link.$t+'" type="video/mp4">'
	  				+'bgvideo'
	  				+'</video></div></section>'
						$('div#content').append(append); 
					   index.push(i);
					} 		
	       		else if (entry.gsx$type.$t == "post") {	
						var append = '<section id="anchor' + i+ '">';
						append += '<div id="t'+i+'"> </div>';
						// append += '<div id="panel' +i+'a" class="info"></div>';
						append += '<p id="panel' +i+'a" class="clearfix info"></p>';
						append += '</section>';
						$('div#content').append(append); 
						var title = '<h2><span class="fa fa-edit"></span> ' + entry.gsx$title.$t + '</h2> ';
						var desc = entry.gsx$content.$t;
						var timeDate = moment(entry.gsx$datetime.$t, "M/DD/YYYY HH:mm:ss").format('dddd, h:mm a');
						var img_code = '';
						var caption = '';
						if (entry.gsx$featured.$t){
							img_code = '<div class="thumbnail with-caption col-sm-12">' + 
									   '<img src="' + entry.gsx$featured.$t + '" class="img-responsive" />' + 
									   '<div class="caption">' + 
									   '	<p class="caption_content">'+ entry.gsx$caption.$t +'</p>' + 
								   	   '</div>' + 
									   '</div> <br />';
						}
						$('#t'+i+'').append(title);
						$('#panel'+i+'a').append(timeDate+'<br>');
						$('#panel'+i+'a').append(img_code);
						$('#panel'+i+'a').append(desc);

					}

					else if (entry.gsx$type.$t == "video") {
			    	var append = '<section id="anchor' + i+ '">';
						append += '<div id="t'+i+'"> </div>';
						append += '<div id="panel'+i+'a"></div>';
						append += '<div class="embed-responsive embed-responsive-16by9" id="video'+i+'"></div>';
						append += '</section>';
						$('div#content').append(append); 
						var title = '<h2><span class="fa fa-film"></span> ' + entry.gsx$title.$t + '</h2> ';
						var desc = entry.gsx$content.$t;
						var timeDate = moment(entry.gsx$datetime.$t, "M/DD/YYYY HH:mm:ss").format('dddd, h:mm a');
						var link = '<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + entry.gsx$link.$t + '" frameborder="0" allowfullscreen></iframe>'
						$('#t'+i+'').append(title);
						$('#panel'+i+'a').append(timeDate+'<br>');
						$('#panel'+i+'a').append(desc);
						$('#video'+i+'').append(link);
					}

					else if (entry.gsx$type.$t == "image") {
			    	var append = '<section id="anchor' + i+ '">';
					  append += '<div id="t'+i+'"> </div>';
						append += '<div id="panel'+i+'a"></div>';
						append += '<div id="pic'+i+'"></div>';
						append += '</li>';
						$('div#content').append(append);
						var title = '<h2><span class="fa fa-camera"></span> ' + entry.gsx$title.$t + '</h2> ';
						var desc = entry.gsx$content.$t;
						var link = ' <img class="img-responsive" src="'+entry.gsx$link.$t+'">'
						var timeDate = moment(entry.gsx$datetime.$t, "M/DD/YYYY HH:mm:ss").format('dddd, h:mm a');
						$('#t'+i+'').append(title);
						$('#panel'+i+'a').append(timeDate+'<br>');
						$('#panel'+i+'a').append(desc);
						$('#pic'+i+'').append(link);
					}


					else if (entry.gsx$type.$t == "interview") {
						var rows = "";
						var check = 1; 

						var count = 0; 
						for (var p in entry) {
							if (count < 11) {
								count++;
								continue; 
							}
							count++;

							if (entry.hasOwnProperty(p)) {
								if (check == 1) {
									rows += "<tr><td>" + entry[p].$t + "</td>";
									check = 2; 
								}
								else if (check == 2) {
									rows += "<td>" + entry[p].$t + "</td></tr>";
									check = 1; 
								}
						  }
						}

			    		var tAppend = '<table class="table table-striped"><tbody id="tbody' + i + '">' + rows + '</tbody></table>';
						var append = '<section id="anchor' + i+ '">';
					    append += '<div id="t'+i+'"> </div>';
						append += '<div class="table-responsive" id="panel'+i+'a">' + tAppend + '</div>';
						$('div#content').append(append);
						var title = '<h2><span class="fa fa-question-circle"></span> ' + entry.gsx$title.$t + '</h2> ';
						var desc = entry.gsx$content.$t;
						var timeDate = moment(entry.gsx$datetime.$t, "M/DD/YYYY HH:mm:ss").format('dddd, h:mm a');
						$('#t'+i+'').append(title);
						$('#t'+i+'').append(timeDate);
						$('#t'+i+'').append(desc);
					}
				});
				
				$( ".transition" ).each(function(i) {
				  var o = tOffset * -1; 
				  $(this).css('left', o);
				  $(this).css('width', w); 
				  $(this).css('height', h); 
				});
	});
}); */


