$(document).ready(function(){
  $(window).on('scroll', function() {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = $('.intro-container').height() + 15;

    if(y_scroll_pos > scroll_pos_test) {
      $('.site-header').addClass('orangeify');
    } else {
      $('.site-header').removeClass('orangeify');
    }
  });
});
