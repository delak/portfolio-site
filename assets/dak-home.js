$(document).ready(function() {
  var sh = $('.site-header');
  var hb = $('.hello-bio');
  var hs = $('.hello-section');
  var mt = $('.masthead-title');
  var showTitle = false;

  $(window).on('scroll', function() {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_title = hb.position().top + hb.outerHeight(true) - 30;
    var scroll_pos_test = hs.height();

    if(y_scroll_pos > scroll_pos_title) {
      showTitle = true;
      mt.addClass('show-title');
    } else {
      showTitle = false;
      mt.removeClass('show-title');
    }

    if(y_scroll_pos > scroll_pos_test) {
      sh.addClass('orangeify');
    } else {
      sh.removeClass('orangeify');
    }
  });
});
