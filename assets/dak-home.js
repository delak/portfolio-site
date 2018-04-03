$(document).ready(function() {
  var sh = $('.site-header');
  var hs = $('.hello-section');
  var snippet = $('.snippet');
  var snippet_clicker = $('.snippet-body, .snippet .title-wrapper .project-question');
  var pl = $('.snippet .project-label');
  var hb = $('.hamburger');
  var win = $(window);

  hb.click(function() {
    sh.toggleClass('toggle-menu');
  });

  $.fn.vAlign = function() {
    return this.each(function(i){
      var ah = $(this).outerHeight();
      $(this).css('margin-top', (ah * -1));
    });
  };

  $('.snippet .project-label').vAlign();

  snippet_clicker.click(function() {
    $(this).closest('.snippet').toggleClass('toggle-snippet');
    snippet.not($(this).closest('.snippet')).removeClass('toggle-snippet');
  });

  win.on("load resize scroll", function(e) {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = hs.height() - 30;

    if(sh.hasClass('toggle-menu')) {
      sh.removeClass('toggle-menu');
    }
  });

  win.on("resize", function(e) {
    $('.snippet .project-label').vAlign();
  })
});
