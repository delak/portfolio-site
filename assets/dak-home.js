$(document).ready(function() {
  var sh = $('.site-header');
  var hs = $('.hello-section');
  var snippet = $('.snippet');
  var snippet_clicker = $('.snippet-body, .snippet .title-wrapper .project-question');
  var pl = $('.snippet .project-label');
  var hb = $('.hamburger');
  var nl = $('.nav-left');
  var nr = $('.nav-right');

  hb.click(function() {
    sh.toggleClass('toggle-menu');
  });

  nr.click(function() {
    var thisSlider = $(this).closest('.snippet').find('.project-image');
    var numImages = parseInt(thisSlider.attr('data-images'));
    var currImage = parseInt(thisSlider.attr('data-this-image'));
    if (currImage < numImages - 1) {
      var nextPos = (currImage + 1) * (100/(numImages-1));
      thisSlider.attr('data-this-image', currImage + 1);
      thisSlider.css('background-position', nextPos+'%');

      if (currImage >= 0) {
        $(this).siblings().css('opacity', 1);
      }

      if (currImage + 2 == numImages) {
        $(this).css('opacity', 0.5);
      }
    }
  });

  nl.click(function() {
    var thisSlider = $(this).closest('.snippet').find('.project-image');
    var numImages = parseInt(thisSlider.attr('data-images'));
    var currImage = parseInt(thisSlider.attr('data-this-image'));
    if (currImage > 0) {
      var nextPos = (currImage - 1) * (100/(numImages-1));
      thisSlider.attr('data-this-image', currImage - 1);
      thisSlider.css('background-position', nextPos+'%');

      if (currImage - 1 == 0) {
        $(this).css('opacity', 0.5);
      }

      if (currImage + 1 <= numImages) {
        $(this).siblings().css('opacity', 1);
      }
    }
  });

  snippet_clicker.click(function() {
    var thisSnippet = $(this).closest('.snippet');
    thisSnippet.find('.project-label').vAlign();
    if (thisSnippet.hasClass('snippet-show')) {
      snippet.hideMe();
    } else {
      thisSnippet.addClass('animatable snippet-show');
      snippet.not(thisSnippet).hideMe();
    }
  });


  $.fn.vAlign = function() {
    return this.each(function(){
      $(this).css('margin-top', ($(this).outerHeight() * -1));
    });
  };

  $.fn.hideMe = function() {
    var thisSnippet = $(this);
    return this.each(function() {
      thisSnippet.removeClass('snippet-show');
      setTimeout(function() {
        thisSnippet.removeClass('animatable');
      }, 400);
    });
  };

  $.fn.initSlideshow = function() {
    return this.each(function() {
      var thisSlider = $(this).closest('.snippet').find('.project-image');
      var numImages = parseInt(thisSlider.attr('data-images'));
      if (numImages > 1) {
        $(this).addClass('animatable');
      }
    });
  }



  $('.snippet .project-label').vAlign();
  $('.slideshow-nav-container').initSlideshow();



  $(window).on("load resize scroll", function(e) {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = hs.height() - 30;

    if(sh.hasClass('toggle-menu')) {
      sh.removeClass('toggle-menu');
    }
  });
});
