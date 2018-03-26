$(document).ready(function() {
  var cs = $('.case-study');
  var mt = $('.menu-toggle');
  var sh = $('.site-header');
  var mf = $('.menu-footer');
  var mh = $('.menu-header');
  var win = $(window);
  var allowFooterScroll;
  var allowHeaderScroll;

  //function that toggles the menu
  var toggleMenu = function() {
    sh.toggleClass('active-menu');
    if(sh.hasClass('active-menu')) {
      mf.css({'top' : (win.height() - mf.height()) + 'px'});
    } else {
      mf.css({'top' : win.height() + 'px'});
    };
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

  //make sure that videos loop forever
  $('video').on('ended', function () {
    this.load();
    this.play();
  });


  $(window).on('scroll', function() {
    var y_scroll_pos = win.scrollTop();
    var page_height = win.height();
    var scroll_pos_footer = cs.position().top + cs.outerHeight(true);

    if((y_scroll_pos + page_height) > scroll_pos_footer) {            // if user has scrolled past the case study
      mf.addClass('deactivate');                                      // disable the fixed footer
      if((y_scroll_pos + page_height) < $(document).height() - 5) {
        allowFooterScroll = true;
      }
    } else {                                                         // but if user is scrolling within the case study
      mf.removeClass('deactivate');                                  // enable the fixed footer
      allowFooterScroll = false;
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
