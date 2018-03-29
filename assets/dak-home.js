$(document).ready(function() {
  var sh = $('.site-header');
  var hs = $('.hello-section');
  var snippet = $('.snippet');
  var win = $(window);

  snippet.click(function() {
    $(this).toggleClass('toggle-preview').siblings().removeClass('toggle-preview');
  })

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
