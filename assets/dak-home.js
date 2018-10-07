$(document).ready(function() {
  var sh = $('.site-header');
  var snippet = $('.snippet');
  var snippet_width = 624;
  var show_btn = $('.slider-show-btn');
  var stw = $('.snippet .title-wrapper');
  var sb = $('.snippet-body');
  var sbx = $('.snippet-box');
  var plpi = $('.project-link .project-image');
  var tco = $('.title-card-outline');
  var hb = $('.hamburger');
  var nl = $('.nav-left');
  var nr = $('.nav-right');
  var hds = $('.hello-drop-shadow');


  show_btn.click(function() {
    $(this).showLabel();
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

  stw.click(function() {
    var thisSnippet = $(this).closest('.snippet');
    thisSnippet.addClass('active-snippet');
    snippet.not(thisSnippet).removeClass('active-snippet');

    sbx.adjustHeight();
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



  $.fn.showLabel = function() {
    var thisSnippet = $(this).closest('.snippet');
    if (thisSnippet.hasClass('snippet-show')) {
      snippet.hideLabel();
    } else {
      thisSnippet.addClass('snippet-show');
      snippet.not(thisSnippet).hideLabel();
    }
  };

  $.fn.adjustHeight = function() {
    var minHeight = $('.active-snippet .snippet-body').innerHeight();

    $(this).css('min-height', minHeight+'px');
  };

  $.fn.setDropShadow = function() {
    var hello_pos = $('.hello-section').innerHeight() - $(this).height();

    $(this).css('margin-top', hello_pos+'px');
  }

  $.fn.hideLabel = function() {
    var thisSnippet = $(this);
    return this.each(function() {
      thisSnippet.removeClass('snippet-show');
    });
  };

  $.fn.initSlideshow = function() {
    return this.each(function() {
      var thisSlider = $(this).closest('.snippet').find('.project-image');
      var numImages = parseInt(thisSlider.attr('data-images'));

      if (numImages > 1) {
        $(this).addClass('slideshow-initiated');
      }
    });
  }


  $('.slider-nav-container').initSlideshow();
  sbx.adjustHeight();


  $(window).on("load resize", function(e) {
    sbx.adjustHeight();
    hds.setDropShadow();
  });

  $(window).on("load resize scroll", function(e) {

    if(sh.hasClass('toggle-menu')) {
      sh.removeClass('toggle-menu');
    }
  });
});
