/**
 * Coin Slider - Unique jQuery Image Slider
 * @version: 1.0 - (2010/04/04)
 * @requires jQuery v1.2.2 or later 
 * @author Ivan Lazarevic
 * Examples and documentation at: http://workshop.rs/projects/coin-slider/
 * Customized by Dela A. Kumahor
 
 * Licensed under MIT licence:
 *   http://www.opensource.org/licenses/mit-license.php
**/

(function($) {

	var params 		= new Array;
	var order		= new Array;
	var images		= new Array;
	var links		= new Array;
	var linksTarget = new Array;
	var desc		= new Array;
	var interval	= new Array;
	var imagePos	= new Array;
	var appInterval = new Array;	
	var squarePos	= new Array;	
	var reverse		= new Array;
	
	$.fn.coinslider= $.fn.CoinSlider = function(options){
		
		init = function(el){
				
			order[el.id] 		= new Array();	// order of square appearance
			images[el.id]		= new Array();
			links[el.id]		= new Array();
			linksTarget[el.id]	= new Array();
			desc[el.id]			= new Array();
			imagePos[el.id]		= 0;
			squarePos[el.id]	= 0;
			reverse[el.id]		= 1;						
				
			params[el.id] = $.extend({}, $.fn.coinslider.defaults, options);
						
			// create images, links and titles arrays
			$.each($('#'+el.id+' img'), function(i,item){
				images[el.id][i] 		= $(item).attr('src');
				links[el.id][i] 		= $(item).parent().is('a') ? $(item).parent().attr('href') : '';
				linksTarget[el.id][i] 	= $(item).parent().is('a') ? $(item).parent().attr('target') : '';
				desc[el.id][i] 			= $(item).next().is('span') ? $(item).next().html() : '';
				$(item).hide();
				$(item).next().hide();
			});			
			

			// set panel
			$(el).css({
				'background-image':'url('+images[el.id][0]+')',
				'width': params[el.id].width,
				'height': params[el.id].height,
				'position': 'relative',
				'background-position': 'top left'
			}).wrap("<div class='coin-slider' id='coin-slider-"+el.id+"' />");	
			
				
			// create title bar
			$('#'+el.id).append("<div class='cs-title' id='cs-title-"+el.id+"' style='position: absolute; bottom:0; left: 0; z-index: 1500;'></div>");
			$('#cs-title-'+el.id).hide();
			
			// create info button
			$('#'+el.id).append("<div class='cs-info' id='cs-info-"+el.id+"' style='position: absolute; bottom:25px; left: 43px; z-index: 2000;'></div>");
			$('#cs-info-'+el.id).css("background-image", "url('img/info-off.png')");
			
						
			$.setFields(el);
			
			if(params[el.id].navigation)
				$.setNavigation(el);
			
			$.transition(el,0);
			$.keynav(el);				
		}
		
		// squares positions
		$.setFields = function(el){
			
			tWidth = sWidth = parseInt(params[el.id].width/params[el.id].spw);
			tHeight = sHeight = parseInt(params[el.id].height/params[el.id].sph);
			
			counter = sLeft = sTop = 0;
			tgapx = gapx = params[el.id].width - params[el.id].spw*sWidth;
			tgapy = gapy = params[el.id].height - params[el.id].sph*sHeight;
			
			for(i=1;i <= params[el.id].sph;i++){
				gapx = tgapx;
				
					if(gapy > 0){
						gapy--;
						sHeight = tHeight+1;
					} else {
						sHeight = tHeight;
					}
				
				for(j=1; j <= params[el.id].spw; j++){	

					if(gapx > 0){
						gapx--;
						sWidth = tWidth+1;
					} else {
						sWidth = tWidth;
					}

					order[el.id][counter] = i+''+j;
					counter++;
					
					if(params[el.id].links)
						$('#'+el.id).append("<a href='"+links[el.id][0]+"' class='cs-"+el.id+"' id='cs-"+el.id+i+j+"' style='width:"+sWidth+"px; height:"+sHeight+"px; float: left; position: absolute;'></a>");
					else
						$('#'+el.id).append("<div class='cs-"+el.id+"' id='cs-"+el.id+i+j+"' style='width:"+sWidth+"px; height:"+sHeight+"px; float: left; position: absolute;'></div>");
								
					// positioning squares
					$("#cs-"+el.id+i+j).css({ 
						'background-position': -sLeft +'px '+(-sTop+'px'),
						'left' : sLeft ,
						'top': sTop
					});
				
					sLeft += sWidth;
				}

				sTop += sHeight;
				sLeft = 0;					
					
			}
			
						
			$('#cs-info-'+el.id).toggle(
				function(){
					$('#cs-title-'+el.id).show();
					$(this).css("background-image", "url('img/info.png')");
				},
				function(){
					$('#cs-title-'+el.id).hide();
					$(this).css("background-image", "url('img/info-off.png')");
				}
			);
			
			$('#masthead').toggle(
				function(){
					$('#coin-slider').show();
					$('#cs-buttons-'+el.id).show();
				},
				function(){
					$('#coin-slider').hide();
					$('#cs-buttons-'+el.id).hide();
				}
			);
			
						
			if(params[el.id].hoverPause){	
				$('.cs-'+el.id).mouseover(function(){
					params[el.id].pause = true;
				});
			
				$('.cs-'+el.id).mouseout(function(){
					params[el.id].pause = false;
				});	
				
				$('#cs-title-'+el.id).mouseover(function(){
					params[el.id].pause = true;
				});
			
				$('#cs-title-'+el.id).mouseout(function(){
					params[el.id].pause = false;
				});	
			}
					
			
		};
				
		
		// transitions
		$.transition = function(el,direction){
			
			if(params[el.id].pause == true) return;
			
			$.effect(el);
			
			squarePos[el.id] = 0;
			appInterval[el.id] = setInterval(function() { $.appearance(el,order[el.id][squarePos[el.id]])  },params[el.id].sDelay);
					
			$(el).css({ 'background-image': 'url('+images[el.id][imagePos[el.id]]+')' });
			
			if(typeof(direction) == "undefined")
				imagePos[el.id]++;
			else
				if(direction == 'prev')
					imagePos[el.id]--;
				else
					imagePos[el.id] = direction;
					
			$('#cs-prev-'+el.id).show();
			$('#cs-next-'+el.id).show();
		
			if  (imagePos[el.id] == images[el.id].length-1) {
				$('#cs-next-'+el.id).hide();
			}
			
			if (imagePos[el.id] == 0){
				$('#cs-prev-'+el.id).hide();
			}
	
			$('.cs-button-'+el.id).removeClass('cs-active');
			$('#cs-button-'+el.id+"-"+(imagePos[el.id]+1)).addClass('cs-active');
			$('.cs-number-'+el.id).removeClass('selected');
			$('#cs-number-'+el.id+"-"+(imagePos[el.id]+1)).addClass('selected');
			
			if(desc[el.id][imagePos[el.id]]){
				$('#cs-info-'+el.id).animate({ 'opacity' : params[el.id].opacity });
				$('#cs-title-'+el.id).animate({ 'opacity' : params[el.id].opacity });
				$('#cs-title-'+el.id).html(desc[el.id][imagePos[el.id]]);
			} else {
				$('#cs-info-'+el.id).css('opacity',0);
				$('#cs-title-'+el.id).css('opacity',0);
			}				
				
		};
		
		$.appearance = function(el,sid){

			$('.cs-'+el.id).attr('href',links[el.id][imagePos[el.id]]).attr('target',linksTarget[el.id][imagePos[el.id]]);

			if (squarePos[el.id] == params[el.id].spw*params[el.id].sph) {
				clearInterval(appInterval[el.id]);
				return;
			}

			$('#cs-'+el.id+sid).css({ opacity: 0, 'background-image': 'url('+images[el.id][imagePos[el.id]]+')' });
			$('#cs-'+el.id+sid).animate({ opacity: 1 }, 300);
			squarePos[el.id]++;
			
		};
		
		// navigation
		$.setNavigation = function(el){
			// create prev and next 
			$(el).append("<div id='cs-navigation-"+el.id+"'></div>");
			
			$('#cs-navigation-'+el.id).append("<a href='#' id='cs-prev-"+el.id+"' class='cs-prev'></a>");
			$('#cs-navigation-'+el.id).append("<a href='#' id='cs-next-"+el.id+"' class='cs-next'></a>");
			$('#cs-prev-'+el.id).css({
				'position' 	: 'absolute',
				'background-image'	: 'url("img/prev_arrow.png")',
				'background-repeat'	: 'no-repeat',
				'background-position'	: 'left center',
				'top'		: 0,
				'left'		: 0,
				'z-index' 	: 1001,
				'opacity'	: params[el.id].opacity
			}).click( function(e){
				e.preventDefault();
				$.transition(el,'prev');
			}).mouseover( function(){ 
				$(this).stop();
				$(this).animate({ opacity: params[el.id].opacity }, 400);
			}).mouseout( function(){ 
				$(this).stop();
				$(this).animate({ opacity: 0 }, 250);
			});
	
			$('#cs-next-'+el.id).css({
				'position' 	: 'absolute',
				'background-image'	: 'url("img/next_arrow.png")',
				'background-repeat'	: 'no-repeat',
				'background-position'	: 'right center',
				'top'		: 0,
				'right'		: 0,
				'z-index' 	: 1001,
				'opacity'	: params[el.id].opacity
			}).click( function(e){
				e.preventDefault();
				$.transition(el);
			}).mouseover( function(){ 
				$(this).stop();
				$(this).animate({ opacity: params[el.id].opacity }, 400);
			}).mouseout( function(){ 
				$(this).stop();
				$(this).animate({ opacity: 0 }, 250);
			});
			
			$('#cs-next-'+el.id).css('opacity',0);
			$('#cs-prev-'+el.id).css('opacity',0);
						
			// image buttons
			$("<div id='cs-buttons-"+el.id+"' class='cs-buttons'></div>").appendTo($('#coin-slider-'+el.id));

			
			for(k=1;k<images[el.id].length+1;k++){
				$('#cs-buttons-'+el.id).append("<div class='button-box'><a href='#' class='cs-button-"+el.id+"' id='cs-button-"+el.id+"-"+k+"'>"+k+"</a><span class='cs-number-"+el.id+"' id='cs-number-"+el.id+"-"+k+"'>"+k+"</span></div>");
			}
			
			$.each($('.cs-button-'+el.id), function(i,item){
				$(item).click( function(e){
					$('.cs-button-'+el.id).removeClass('cs-active');
					$(this).addClass('cs-active');
					e.preventDefault();
					$.transition(el,i);
				})
			});	
			
//			$('#cs-navigation-'+el.id+' a').mouseout(function(){
//				$('#cs-navigation-'+el.id).hide();
//				params[el.id].pause = false;
//			});						

			$("#cs-buttons-"+el.id).css({
				'left'			: '50%',
				'margin-left' 	: -images[el.id].length*20/2-8,
				'position'		: 'relative'
				
			});
		}


		// keypress navigation
		$.keynav = function(el){
			$(document).keydown(function(e){
		    	if (e.keyCode == 37 && (imagePos[el.id] != 0)) { 
		       		e.preventDefault();
		       		$.transition(el,'prev');
		    	} else if (e.keyCode == 39 && (imagePos[el.id] != images[el.id].length-1)) { 
		    		e.preventDefault();
		    		$.transition(el);
		    	} 
//		    	else if (e.keyCode == 73) {
//		    		e.preventDefault();
//		    		$('#cs-title-'+el.id).toggle();
//		    		$('#cs-info-'+el.id).toggle("background-image", "url('img/info.png')");
//		    	}
			});
		}

		// effects
		$.effect = function(el){
			
			effA = ['random','swirl','rain','straight'];
			if(params[el.id].effect == '')
				eff = effA[Math.floor(Math.random()*(effA.length))];
			else
				eff = params[el.id].effect;

			order[el.id] = new Array();

			if(eff == 'random'){
				counter = 0;
				  for(i=1;i <= params[el.id].sph;i++){
				  	for(j=1; j <= params[el.id].spw; j++){	
				  		order[el.id][counter] = i+''+j;
						counter++;
				  	}
				  }	
				$.random(order[el.id]);
			}
			
			if(eff == 'rain')	{
				$.rain(el);
			}
			
			if(eff == 'swirl')
				$.swirl(el);
				
			if(eff == 'straight')
				$.straight(el);
				
			reverse[el.id] *= -1;
			if(reverse[el.id] > 0){
				order[el.id].reverse();
			}

		}

			
		// shuffle array function
		$.random = function(arr) {
						
		  var i = arr.length;
		  if ( i == 0 ) return false;
		  while ( --i ) {
		     var j = Math.floor( Math.random() * ( i + 1 ) );
		     var tempi = arr[i];
		     var tempj = arr[j];
		     arr[i] = tempj;
		     arr[j] = tempi;
		   }
		}	
		
		//swirl effect by milos popovic
		$.swirl = function(el){

			var n = params[el.id].sph;
			var m = params[el.id].spw;

			var x = 1;
			var y = 1;
			var going = 0;
			var num = 0;
			var c = 0;
			
			var dowhile = true;
						
			while(dowhile) {
				
				num = (going==0 || going==2) ? m : n;
				
				for (i=1;i<=num;i++){
					
					order[el.id][c] = x+''+y;
					c++;

					if(i!=num){
						switch(going){
							case 0 : y++; break;
							case 1 : x++; break;
							case 2 : y--; break;
							case 3 : x--; break;
						
						}
					}
				}
				
				going = (going+1)%4;

				switch(going){
					case 0 : m--; y++; break;
					case 1 : n--; x++; break;
					case 2 : m--; y--; break;
					case 3 : n--; x--; break;		
				}
				
				check = $.max(n,m) - $.min(n,m);			
				if(m<=check && n<=check)
					dowhile = false;
									
			}
		}

		// rain effect
		$.rain = function(el){
			var n = params[el.id].sph;
			var m = params[el.id].spw;

			var c = 0;
			var to = to2 = from = 1;
			var dowhile = true;


			while(dowhile){
				
				for(i=from;i<=to;i++){
					order[el.id][c] = i+''+parseInt(to2-i+1);
					c++;
				}
				
				to2++;
				
				if(to < n && to2 < m && n<m){
					to++;	
				}
				
				if(to < n && n>=m){
					to++;	
				}
				
				if(to2 > m){
					from++;
				}
				
				if(from > to) dowhile= false;
				
			}			

		}

		// straight effect
		$.straight = function(el){
			counter = 0;
			for(i=1;i <= params[el.id].sph;i++){
				for(j=1; j <= params[el.id].spw; j++){	
					order[el.id][counter] = i+''+j;
					counter++;
				}
				
			}
		}

		$.min = function(n,m){
			if (n>m) return m;
			else return n;
		}
		
		$.max = function(n,m){
			if (n<m) return m;
			else return n;
		}		
	
	this.each (
		function(){ init(this); }
	);
	

	};
	
	
	// default values
	$.fn.coinslider.defaults = {	
		width: 565, // width of slider panel
		height: 290, // height of slider panel
		spw: 7, // squares per width
		sph: 5, // squares per height
		delay: 3000, // delay between images in ms
		sDelay: 30, // delay beetwen squares in ms
		opacity: 0.7, // opacity of title and navigation
		titleSpeed: 500, // speed of title appearance in ms
		effect: '', // random, swirl, rain, straight
		navigation: true, // prev next and buttons
		links : true, // show images as links 
		hoverPause: true // pause on hover		
	};	
	
})(jQuery);
	