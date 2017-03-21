$(document).ready(function(){
  $(".new-tweet textarea").on('keyup', function(){
    var length = $(this).val().length;
    var numberOfCharactersLeft = 140 - length;
    var updatedCounter = $('.counter').text(numberOfCharactersLeft);
    if (numberOfCharactersLeft <= 0) {
      updatedCounter.addClass("color-red");
    } else {
      updatedCounter.removeClass("color-red")
    }
  });
})
