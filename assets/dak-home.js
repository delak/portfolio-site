$(document).ready(function() {
  var sh = $('.site-header');
  var hs = $('.hello-section');
  var snippet = $('.snippet');
  var snippet_width = 624;
  var show_btn = $('.slider-show-btn');
  var pl = $('.snippet .project-label');
  var tw = $('.snippet .title-wrapper');
  var sbx = $('.snippet-box');
  var sb = $('.snippet-body');
  var plpi = $('.project-link .project-image');
  var tco = $('.title-card-outline');
  var hb = $('.hamburger');
  var nl = $('.nav-left');
  var nr = $('.nav-right');

  show_btn.click(function() {
    $(this).snippetClick();
  });

  hb.click(function() {
    sh.toggleClass('toggle-menu');
  });

  nl.click(function() {
    var thisSlider = $(this).closest('.snippet').find('.project-image');
    var numImages = parseInt(thisSlider.attr('data-images'));
    var currImage = parseInt(thisSlider.attr('data-this-image'));

    if (currImage > 0) {
      var nextPos = ((currImage - 1) * (100/(numImages-1)));
      thisSlider.attr('data-this-image', currImage - 1);
      thisSlider.css('background-position', nextPos+'%');

      if (currImage - 1 == 0) {
        $(this).addClass('disabled-btn');
      }

      if (currImage + 1 <= numImages) {
        $(this).siblings().removeClass('disabled-btn');
      }
    }
  });

  nr.click(function() {
    var thisSlider = $(this).closest('.snippet').find('.project-image');
    var numImages = parseInt(thisSlider.attr('data-images'));
    var currImage = parseInt(thisSlider.attr('data-this-image'));

    if (currImage < numImages - 1) {
      var nextPos = ((currImage + 1) * (100/(numImages-1)));
      thisSlider.attr('data-this-image', currImage + 1);
      thisSlider.css('background-position', nextPos+'%');

      if (currImage >= 0) {
        $(this).siblings().removeClass('disabled-btn');
      }

      if (currImage + 2 == numImages) {
        $(this).addClass('disabled-btn');
      }
    }
  });

  tw.click(function() {
      var thisSnippet = $(this).closest('.snippet');
      thisSnippet.addClass('active-snippet');
      snippet.not(thisSnippet).removeClass('active-snippet');
  });

  plpi.hover(function() {
    $(this).closest('.project').addClass('hover-project');
    }, function(){
    $(this).closest('.project').removeClass('hover-project');
  });

  tco.hover(function() {
    $(this).closest('.project').addClass('hover-project');
    }, function(){
    $(this).closest('.project').removeClass('hover-project');
  });



  $.fn.snippetClick = function() {
    var thisSnippet = $(this).closest('.snippet');
    thisSnippet.find('.project-label').vAlign();
    if (thisSnippet.hasClass('snippet-show')) {
      snippet.hideMe();
    } else {
      thisSnippet.addClass('animatable snippet-show');
      snippet.not(thisSnippet).hideMe();
    }
  };

  $.fn.adjustHeight = function() {
    var minHeight = Math.max.apply(null, sb.map(function () {
      return $(this).height();
    }).get());

    $(this).css('min-height', minHeight+'px');
  };

  $.fn.hideMe = function() {
    var thisSnippet = $(this);
    return this.each(function() {
      thisSnippet.removeClass('snippet-show');
      thisSnippet.removeClass('slider-show');
      setTimeout(function() {
        thisSnippet.removeClass('animatable');
      }, 400);
    });
  };

  $.fn.initSlideshow = function() {
    return this.each(function() {
      var thisSlider = $(this).closest('.snippet').find('.project-image');
      var numImages = parseInt(thisSlider.attr('data-images'));

      $(this).closest('.snippet').find('.project-meta').addClass('meta-ready');
      if (numImages > 1) {
        $(this).addClass('slideshow-initiated');
      }
    });
  }



  $('.slider-nav-container').initSlideshow();
  sbx.adjustHeight();



  $(window).on("load resize", function(e) {
    sbx.adjustHeight();
  });
});
