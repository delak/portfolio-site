$(document).ready(function() {

  //make sure that videos loop forever
  $('video').on('ended', function () {
    this.load();
    this.play();
  });
});
