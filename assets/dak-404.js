$(document).ready(function() {
  var sh = $('.site-header');
  var hs = $('.hello-section');
  var mt = $('.menu-toggle');
  var mf = $('.menu-footer');
  var mh = $('.menu-header');
  var win = $(window);
  var allowFooterScroll = true;
  var allowHeaderScroll;

  //function that toggles the menu
  var toggleMenu = function() {
    sh.toggleClass('active-menu');

    if(allowFooterScroll == true) { // if close to the footer, scroll to the bottom of the page
      $("html, body").animate({ scrollTop: $(document).height() }, "slow", function() {
        allowFooterScroll = false;
      });
      return false;
    };

    if(allowHeaderScroll == true) { // if close to the header, scroll to the top of the page
      $("html, body").animate({ scrollTop: 0 }, 200, function() {
        allowHeaderScroll = false;
      });
      return false;
    };
  };

  // controls the menu button
  mt.click(function() {
    toggleMenu();
  });

  // exit from the menu if user clicks anywhere on the background
  $(".click-blocker").on("click", function() {
    if(sh.hasClass('active-menu')) {
      toggleMenu();
    };
  });

  $(window).on('scroll', function() {
    var y_scroll_pos = window.pageYOffset;
    var page_height = win.height();
    var scroll_pos_test = hs.height() - 30;

    if(y_scroll_pos > scroll_pos_test) {
      sh.addClass('orangeify');
    } else {
      sh.removeClass('orangeify');
    }

    if((y_scroll_pos + page_height) < $(document).height() - 5) {
      allowFooterScroll = true;
    }

    if(y_scroll_pos < 60) {
      mh.addClass('deactivate');
      if(y_scroll_pos > 5) {
        allowHeaderScroll = true;
      }
    } else {
      mh.removeClass('deactivate');
      allowHeaderScroll = false;
    }

    if(sh.hasClass('active-menu') && (allowFooterScroll == false) && (allowHeaderScroll == false)) {
      toggleMenu();
    }
  });
});
