$(document).ready(function() {

  var toggleMenu = function() {
    $('.site-header').toggleClass('active-menu');
    $('main').toggleClass('fader');
    $('footer').toggleClass('fader');
  };

  $('.menu-toggle').click(function() {
    toggleMenu();
  });

  $('.click-blocker').on('click', function() {
    if($('.site-header').hasClass('active-menu')) {
      toggleMenu();
    };
  });

  $('.info-pane').hover(function() {
    var hoverImage = $(this).attr('data-image');
    $('#image'+hoverImage).toggleClass('hover');
  })

  $(window).on('scroll', function() {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = $('.intro-container').height() + $('.masthead').height()/2;

    if(y_scroll_pos > scroll_pos_test) {
      $('.site-header').addClass('orangeify');
    } else {
      $('.site-header').removeClass('orangeify');
    }

    if($('.site-header').hasClass('active-menu')) {
      toggleMenu();
    }
  });
});
