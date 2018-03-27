$(document).ready(function() {
  var sh = $('.site-header');
  var hs = $('.hello-section');
  var win = $(window);
  var allowHeaderScroll;

  // function that binds hover to click fo touch devices
  $('.hover').bind('touchstart touchend', function(e) {
        e.preventDefault();
        $(this).toggleClass('hover_effect');
    });

  win.on('scroll', function() {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = hs.height() - 30;

    if(y_scroll_pos > scroll_pos_test) {
      sh.addClass('bg-whitener');
    } else {
      sh.removeClass('bg-whitener');
    }
  });
});
