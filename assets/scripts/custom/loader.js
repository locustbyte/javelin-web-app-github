$( document ).ready(function() {
    $('#overlay1, #overlay2, #overlay3').hide();
    $('.overlay-spinner1').on( "click", function() {
      $('#overlay1').show();
      $('#overlay1').on( "click", function() {
        $(this).hide();
      });
    });

    $('.overlay-spinner2').on( "click", function() {
      $('#overlay2').show();
      $('#overlay2').on( "click", function() {
        $(this).hide();
      });
    });

    $('.overlay-spinner3').on( "click", function() {
      $('#overlay3').show();
    });
  });

  $('.loading').on( "click", function() {
    $(this).toggleClass('loading--on');
    setTimeout(function() {
      $('.loading').removeClass("loading--on");
    }, 4000);
  });