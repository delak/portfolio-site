$(document).ready(function() {

  $('.menu-toggle').click(function() {
    toggleMenu();
  });

  $('.info-pane').hover(function() {
    var hoverImage = $(this).attr('data-image');
    $('#image'+hoverImage).toggleClass('hover');

    $(this).click(function() {
      $('html, body').animate({
          scrollTop: $('#image'+hoverImage).offset().top - 100
      }, 300);
    });
  });



  $(window).on('scroll', function() {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = $('.intro-container').height() + $('.masthead').height()/2;

    if(y_scroll_pos > scroll_pos_test) {
      $('.site-header').addClass('orangeify');
    } else {
      $('.site-header').removeClass('orangeify');
    }
  });
});
