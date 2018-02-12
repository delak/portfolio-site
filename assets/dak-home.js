$(document).ready(function() {
  var sh = $('.site-header');
  var m = $('.masthead')
  var hb = $('.hello-bio');
  var hs = $('.hello-section');
  var showTitle = false;

  var toggleMenu = function() {
    $('.site-header').toggleClass('active-menu');
    $('main').toggleClass('fader');
    $('footer').toggleClass('fader');
    if (showTitle == false) {
      sh.toggleClass('show-title');
    }
  };

  $('.menu-toggle').click(function() {
    toggleMenu();
  });

  $(".click-blocker").on("click", function() {
    if($('.site-header').hasClass('active-menu')) {
      toggleMenu();
    };
  });

  $(window).on('scroll', function() {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_title = hb.position().top + hb.outerHeight(true) - 30;
    var scroll_pos_test = hs.height();

    if(y_scroll_pos > scroll_pos_title) {
      showTitle = true;
      sh.addClass('show-title');
    } else {
      showTitle = false;
      sh.removeClass('show-title');
    }

    if(y_scroll_pos > scroll_pos_test) {
      sh.addClass('orangeify');
    } else {
      sh.removeClass('orangeify');
    }

    if($('.site-header').hasClass('active-menu')) {
      toggleMenu();
    }
  });
});
