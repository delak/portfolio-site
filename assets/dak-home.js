$(document).ready(function() {
  var sh = $('.site-header');
  var hs = $('.hello-section');
  var snippet = $('.snippet');
  var snippet_clicker = $('.snippet-body, .snippet .title-wrapper .project-question');
  var pl = $('.snippet .project-label');
  var hb = $('.hamburger');

  hb.click(function() {
    sh.toggleClass('toggle-menu');
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

  $('.snippet .project-label').vAlign();

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

  $(window).on("load resize scroll", function(e) {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = hs.height() - 30;

    if(sh.hasClass('toggle-menu')) {
      sh.removeClass('toggle-menu');
    }
  });
});
