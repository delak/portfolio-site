$(document).ready(function() {
  var sh = $('.site-header');
  var hb = $('.hamburger');
  var win = $(window);

  //make sure that videos loop forever
  $('video').on('ended', function () {
    this.load();
    this.play();
  });

  hb.click(function() {
    sh.toggleClass('toggle-menu');
  });

  win.on("load resize scroll", function(e) {
    var y_scroll_pos = window.pageYOffset;

    if(sh.hasClass('toggle-menu')) {
      sh.removeClass('toggle-menu');
    }
  });
});
