$(document).ready(function() {
  $('.menu-toggle').click(function() {
    toggleMenu();
  });

  $('.info-pane').hover(function() {
    var hoverImage = $(this).attr('data-image');
    $('#image'+hoverImage).toggleClass('hover');
  });

  $('video').on('ended', function () {
    this.load();
    this.play();
  });

  $(window).on('scroll', function() {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = $('.intro-container').height() + $('.masthead').height()/2;
  });
});
