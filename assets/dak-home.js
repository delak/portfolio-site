$(document).ready(function() {
  var sh = $('.site-header');
  var hs = $('.hello-section');
  var mt = $('.menu-toggle');
  var mf = $('.menu-footer');
  var mh = $('.menu-header');
  var pc = $('.projects-container');
  var pp = $('.projects-panel');
  var win = $(window);
  var allowHeaderScroll;

  //function that toggles the menu
  var toggleMenu = function() {
    sh.toggleClass('active-menu');
    if(sh.hasClass('active-menu')) {
      mf.css({'top' : (win.height() - mf.height()) + 'px'});
    } else {
      mf.css({'top' : win.height() + 'px'});
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
    var panel_pos = pc.position();
    var scroll_pos_test = hs.height() - 30;

    if(y_scroll_pos > panel_pos.top) {
      pp.addClass('panel-fix');
    } else {
      pp.removeClass('panel-fix');
    }

    if(y_scroll_pos > scroll_pos_test) {
      sh.addClass('orangeify');
    } else {
      sh.removeClass('orangeify');
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

    if(sh.hasClass('active-menu') && (allowHeaderScroll == false)) {
      toggleMenu();
    }
  });
});
