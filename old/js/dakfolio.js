$(document).ready(function(){
	
	var timer = 200;
	var thumbfade = .15;
	
	var currentFilters = new Array;
	var stageRow = 0;
	var joinString = '';
	var holdtags = 0;
	
	var images		= new Array;
	var desc		= new Array;
	var interval	= new Array;
	var imagePos	= new Array;
	var appInterval = new Array;	
	var squarePos	= new Array;	
	
	var activeProjects = new Array;
	var imgAssets = ['img/prev_arrow.png', 'img/next_arrow.png', 'img/tag_close.png'];
	preload(imgAssets);
	
	$(images).each(function() {
		var image = $('<img />').attr('src', this);
	});
	
	function initProjs(slider) { 
		var sliderId = slider.attr('id');

		images[sliderId]		= new Array();
		desc[sliderId]			= new Array();
		imagePos[sliderId]		= 0;
		squarePos[sliderId]		= 0;
		
		// create images, links and titles arrays
		$.each($('#'+sliderId+' img'), function(i,item){
			images[sliderId][i] 		= $(item).attr('src');
			desc[sliderId][i] 			= $(item).next().is('span') ? $(item).next().html() : '';
			$(item).hide();
			$(item).next().hide();
			var image = $('<img />').attr('src', images[sliderId][i]);
		});	
			
		// set panel
		$(slider).css({
			'background-image':'url('+images[sliderId][0]+')',
			'width': 684,
			'height': 390,
			'position': 'relative',
			'background-position': 'top left'
		}).wrap("<div class='coin-slider' id='coin-slider-"+sliderId+"' />");	
		
		setFields(slider);
		
		setNavigation(slider);
		
		transition(slider,0);
		
		keynav(slider);
	}
	
	
	function preload(arrayOfImages) {
	    $(arrayOfImages).each(function(){
	        $('<img/>')[0].src = this;
	    });
	}
	
	
	// squares positions
	function setFields(slider) {
		var sliderId = slider.attr('id');
		$('#'+sliderId).append("<div class='cs-"+sliderId+"' id='cs-"+sliderId+"' style='width:684px; height:390px; float: left; position: absolute;'></div>");
							
		// positioning squares
		$("#cs-"+sliderId).css({ 
			'background-position': 0 +'px '+(0+'px'),
			'left' : 0,
			'top': 0
		});
	};
		
	
	// transitions
	function transition(slider,direction){
		var sliderId = slider.attr('id');
		
		squarePos[sliderId] = 0;
		appInterval[sliderId] = setInterval(function() { appearance(slider)  },0);
			
		$(slider).css({ 'background-image': 'url('+images[sliderId][imagePos[sliderId]]+')' });
		
		if(typeof(direction) == "undefined")
			imagePos[sliderId]++;
		else
			if(direction == 'prev')
				imagePos[sliderId]--;
			else
				imagePos[sliderId] = direction;
				
		$('#cs-prev-'+sliderId).show();
		$('#cs-next-'+sliderId).show();
		
		var projClass = slider.attr('class').split(' ').pop();
		
		$('#'+projClass).find('a.nav-left').css({ visibility: 'visible' });
		$('#'+projClass).find('a.nav-right').css({ visibility: 'visible' });
	
		if  (imagePos[sliderId] == images[sliderId].length-1) {
			$('#cs-next-'+sliderId).hide();
			$('#'+projClass).find('a.nav-right').css({ visibility: 'hidden' });
		}
		
		if (imagePos[sliderId] == 0){
			$('#cs-prev-'+sliderId).hide();
			$('#'+projClass).find('a.nav-left').css({ visibility: 'hidden' });
		}
		
		$('#'+projClass+' .caption-box').find('div.proj-paging').html(imagePos[sliderId]+1 + ' of ' + images[sliderId].length);
		
		$('#'+projClass+' .caption-box').find('div.caption').html(desc[sliderId][imagePos[sliderId]]);
			
	};
	
	
	function appearance(slider){
		var sliderId = slider.attr('id');
	
		if (squarePos[sliderId] == 1) {
			clearInterval(appInterval[sliderId]);
			return;
		}
	
		$('#cs-'+sliderId).css({ opacity: 0, 'background-image': 'url('+images[sliderId][imagePos[sliderId]]+')' });
		$('#cs-'+sliderId).animate({ opacity: 1 }, 300);
		squarePos[sliderId]++;
	};
	
	
	var leftClick = function(e) {
		e.preventDefault();
		transition($(this).parent().parent(),'prev');
	}
	
	var rightClick = function(e) {
		e.preventDefault();
		transition($(this).parent().parent());
	}
	
	var arrowHover = function() {
		$(this).stop().animate({ opacity: '0.7' }, 400);
	}
	
	var arrowLeave = function() {
		$(this).stop().animate({ opacity: '0' }, 250);
	}
	
	
	// keypress navigation
	function keynav(slider){
		$(document).keydown(function(e){
			if ( slider.parent().hasClass('active-slideshow') ) {
				var sliderId = slider.attr('id'); 
		    	if (e.keyCode == 37 && (imagePos[sliderId] != 0)) {
	    	   		e.preventDefault();
	       			transition(slider,'prev');
	    		} else if (e.keyCode == 39 && (imagePos[sliderId] != images[sliderId].length-1)) { 
	    			e.preventDefault();
	    			transition(slider);
	    		} 
	    	}
		});
	}
	
	
	function setNavigation(slider) {
		var sliderId = slider.attr('id');
		$(slider).append("<div id='cs-navigation-"+sliderId+"'></div>");
		$('#cs-navigation-'+sliderId).append("<a href='#' id='cs-prev-"+sliderId+"' class='cs-prev'></a>");
		$('#cs-navigation-'+sliderId).append("<a href='#' id='cs-next-"+sliderId+"' class='cs-next'></a>");
		
		projClass = slider.attr('class').split(' ').pop();
		
		$('#'+projClass).find('a.nav-right').click(function(e) {
			e.preventDefault();
			transition(slider);
		});
		
		$('#'+projClass).find('a.nav-left').click(function(e) {
			e.preventDefault();
			transition(slider,'prev');
		});
	}
	
	
	// function to scroll to a particular point of the page
	function initStage(proj){
		var projTop = $('#stage').offset().top;
		var screenDisplace = ($(window).height() - 415)/2;
	    $('html,body').delay(timer/2).stop(true).animate({scrollTop: projTop - screenDisplace}, timer*1.5, function() {
	    	openProj(proj);
	    });
	}
	
	function openProj(proj) {
		$('#stage-close').fadeTo(timer, 1);
		$(proj).find('div.thumbnail').stop(true).animate({ top:'10px', opacity: '0' }, timer/2, function() {
			$(this).hide();
			$('div.'+$(proj).attr("id")).parent().show().delay(100).stop(true).animate({ top:'0', opacity: '1' }, timer).addClass('active-slideshow');
			$(proj).find('div.caption-box').show().stop(true).animate({ top: '6px', opacity: '1' }, timer);
		});
	}
	
	
	// project rollover
	var hoverOver = function() {	  
	    $(this).addClass('highlight');
	    $(this).find('div.thumb-color').stop(true).css({ opacity: '.2' }).animate({ opacity:'1' },timer);
	}
	  		
	var hoverOut = function() {
	  	$(this).find('div.thumb-color').stop(true).css({ opacity:'0' },timer);
	 	$(this).removeClass('highlight');
	}
	
	
	// tag box reveal
	$('#portfolio-title').toggle(function() {
		var arrow = $(this).find('img');
		$('div.filter-list').clearQueue().slideDown(timer/2);
		$('#portfolio-title .more-arrow').toggleClass('less-arrow');
		$(this).addClass('opened');
	}, function() {
		var arrow = $(this).find('img');
		$('div.filter-list').clearQueue().slideUp(timer/2);
		$('#portfolio-title .more-arrow').toggleClass('less-arrow');
		$(this).removeClass('opened');
	});
	
	
	// tag highlighting
	var tagThis = function() {
		var currentId = $(this).attr('id');
			
		function showProjects(projFilter) {
			var toUnblur = $('li.project.' + projFilter);
			var toBlur = $('li.project:not(' + projFilter + ')')
			activeProjects = [];
			toUnblur.each(function(){ activeProjects.push(this.id); });
			
			if ( $('div.active-slideshow').length != 0 ) {
				$('li.active-proj').find('div.proj-title').click();
				$('#stage').hide();
			}
			toBlur.addClass('blurred').hide();
			toUnblur.removeClass('blurred').hide().fadeIn(timer);
			
			if ( toUnblur.length == 0 ) {
				$('#bubble').show();
				$('div.column li:not(#all, .selected)').addClass('disabled').unbind('click').css({cursor: 'default'});
				holdtags = 1;
			} else {
				$('#bubble').hide();
				$('div.column li.disabled').removeClass('disabled').bind('click', tagThis).css({cursor: 'pointer'});
			}
			setTitle();
			setWindowHeight();
		}
		
		function resetTags() {
			currentFilters = [];
			tagged = [];
			activeProjects = [];
			var allProj = $('li.project');
			allProj.each(function(){ activeProjects.push(this.id); });
			
			allProj.each(function() { tagged.push($(this)) });
			
			if ( $('div.active-slideshow').length != 0 ) {
				$('li.active-proj').find('div.proj-title').click();
				$('#stage').hide();
			}
			allProj.removeClass('blurred').hide().fadeIn(timer);
			
			$('div.column li').removeClass('selected');
			$('#all').addClass('selected');
			
			$('#bubble').hide();
			$('div.column li.disabled').removeClass('disabled').bind('click', tagThis).css({cursor: 'pointer'});
			
			setTitle();
			setWindowHeight();
		}
		
		function setTitle() {
			var portfolioTitle = '<span class="gray">Showing:</span> ' + $('div.column li.selected').map(function(val, i) {
				if ( val < $('div.column li.selected').length - 2 ) {
					joinString = '<span class="gray">,</span> ';
				} else {
					if ( val == $('div.column li.selected').length - 2 ) {
						joinString = ' <span class="gray">&amp;</span> ';
					} else {
						joinString = ' ';
					}
				}
				return $(this).text() + joinString;
			}).get().join('') + '<span class="gray">projects</span><div class="more-arrow less-arrow"></div>';
			
			$('#portfolio-title').css({ opacity: '0' }).html(portfolioTitle).animate({ opacity: '1' }, timer/2);
		}
		
		function setWindowHeight() {
			$('#wrapper').css({ 'min-height': $(window).height() + 5 });
		}
		
		if ( currentId == 'all' ) {
			return resetTags();
		} else {
			if ( !$(this).hasClass('selected') ) {
				currentFilters.push(currentId);

				$('#all').removeClass('selected');
				$(this).toggleClass('selected');
			} else {
				currentFilters = jQuery.grep(currentFilters, function(value) {
				  return value != currentId;
				});
				
				$(this).toggleClass('selected');
			}
			
			var projFilter = '';
			if ( currentFilters.length > 0 ) {
				for(k=0; k < currentFilters.length; k++) {
					projFilter += '.' + currentFilters[k];
				}
				return showProjects(projFilter);
			} else {
				return resetTags();
			}
		}
	};


	// stage opening	
	function prepProject(proj){
		var projID = proj.attr('id');
		var oldProj = $('li.active-proj');
		
		function closeSlideshow() {
			if ($('div.active-slideshow').length != 0) {
				$('div.active-slideshow').stop(true).animate({ top: '10px', opacity:'0' }, timer, function() {
					$(this).hide().removeClass('active-slideshow');
				});
			}
		}
	
		function closeProject() { 
			if (oldProj.length != 0) { 
				oldProj.find('div.caption-box').stop(true).animate({ top:'16px', opacity: '0' }, timer/2, function() {
					$(this).hide();
				});
				oldProj.find('div.thumbnail').show().delay(timer/2).stop(true).animate({ top: '0', opacity: '1' }, timer);
				oldProj.find('div.close-tab').delay(timer/2).show(timer), function() {
					switchClick( oldProj );
				};
			}
			
			if ( proj.hasClass('active-proj') ) {		 		// closing an open project
				oldProj.removeClass('active-proj');
				closeStage();
				return false;
			} else { 			 								// opening a new project
				switchClick( oldProj );
				oldProj.find('div.thumb-color').fadeTo(timer*2, 0);
				oldProj.removeClass('active-proj').bind('mouseleave', hoverOut).bind('mouseenter', hoverOver);
				oldProj.mouseleave();
				
				proj.addClass('active-proj');
				
				proj.unbind('click').unbind('mouseenter').unbind('mouseleave').css({cursor: 'default'});
				proj.find('div.proj-title').bind('click', function(e1) {
					e1.preventDefault();
					switchClick( proj );
				});
				resetThumbnail(proj);
			
				var projPos = $.inArray(proj.attr('id'), activeProjects);
				var newRow =  Math.floor(projPos/3)*3;
				if ( $('#stage:visible').length == 0 ) {				// if the stage is not already visible
					stageRow = newRow;
					openStage(moveStage());										
				} else {												// if there is an active row
					if ( newRow == stageRow ) {							// and selected project is in it
						initStage(proj);									
					} else {											// but if project is not in active row
						stageRow = newRow;
						closeStage();									// close the active row
						setTimeout(function() {							// wait
							openStage(moveStage());						// open a new row
						}, timer*2);
					}
				}
			}
		}
		
		
		function closeStage() {
			$('#stage').slideUp(timer*2);
			$('#stage-close').fadeTo(timer*2, 0);
			$('div.thumb-fade').animate({ opacity : '1' });
		}	
		
		function openStage() {
			$('div.thumb-color').not(proj.find('div.thumb-color')).fadeTo(timer*2, 0);
			$('#stage').delay(100).slideDown(timer*2);
			setTimeout(function() {							
				initStage(proj);			
			}, timer*2);
		}
		
		function resetThumbnail(proj) {
			proj.find('div.thumb-color').stop(true).animate({ opacity:'0' },timer*2);
			proj.find('div.preview-desc').stop(true).animate({ bottom: '15px', opacity: '0' },timer/3);
			proj.removeClass('highlight');
		}
		
		closeProject(closeSlideshow());
	}
	
	
	function switchClick(proj){
		proj.find('div.caption-box .proj-title').unbind('click');
		proj.click(function() {
			prepProject( proj );
		}).bind('mouseenter', hoverOver).bind('mouseleave', hoverOut).css({cursor: 'pointer'});
	}
	
	
	function moveStage() {
		$('#stage').remove().insertBefore('#'+activeProjects[stageRow]);
	}
	
	// initialize each slideshow 
	$('li.project').each(function(){ 
		var projbox = $(this);
		var projname = $(this).attr('id');
		activeProjects.push(this.id);
		  	var slideBox = $('div.' + projbox.attr('id'))
			initProjs(slideBox);
		    $('div.' + projname).show();
		    switchClick( projbox );
		    
		    slideBox.find('a.cs-next').live('click', rightClick).live('mouseenter', arrowHover).live('mouseleave', arrowLeave);
		    slideBox.find('a.cs-prev').live('click', leftClick).live('mouseenter', arrowHover).live('mouseleave', arrowLeave);
	});
	
	
	closeProjs = function() {
		$('li.active-proj').find('div.proj-title').click();
	}
	
	
	$('#stage-close').live('click', closeProjs);
	$('#all').css({ 'list-style': 'none' });
		
			
	// intialize the site
	$('li.project').bind('mouseenter', hoverOver);
	$('li.project').bind('mouseleave', hoverOut);
	$('div.column li').bind('click', tagThis);
	
});