$(document).ready(function ($) {

  var $jq = jQuery.noConflict();
  //sticy top bar
  $(window).scroll(function () {
    var currentscroll = $(window).scrollTop();
    if (currentscroll > $('header').height()) {
      $('header, .wrapper').addClass('fixed');

    } else {
      $('header, .wrapper').removeClass('fixed');
    }
  });

// header-margin
var myMarginTop = parseInt( jQuery("html").css("marginTop") );
var headerHeight = $('.wrapper header').outerHeight();
jQuery("main#maincontent,.main-post-div").css('margin-top', headerHeight - myMarginTop + 'px');


  // Show the first tab and hide the rest

  $('#tabs-nav li:first-child').addClass('active');
  $('.tab-content').hide();
  $('.tab-content:first').show();

  // Click function
  $('#tabs-nav li').click(function () {
    $('#tabs-nav li').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').hide();

    var activeTab = $(this).find('a').attr('href');
    $(activeTab).fadeIn();

    return false;
  });


  // $(window).load(function () {
  //   let urlString = window.location.href;
  //   let paramString = urlString.split('#')[1];
  //   let queryString = new URLSearchParams(paramString);
  //   for (let pair of queryString.entries()) {
  //     var current_href = pair[0];
  //   }
  //   $.fn.hasAnyClass = function() {
  //     for (var i = 0; i < arguments.length; i++) {
  //         var classes = arguments[i].split(" ");
  //         for (var j = 0; j < classes.length; j++) {
  //             if (this.hasClass(classes[j])) {
  //                 return true;
  //             }
  //         }
  //     }
  //     return false;
  // }
  //   if(!$('body').hasAnyClass('page-template-about' , 'page-template-community_empwerment' , 'page-template-contact','.page-template-covid-emergency-appeal')) {
  //     if (queryString != '') {
  //       $('a[href="#' + current_href + '"]').parent('li').addClass('active');
  //       $('a[href="#' + current_href + '"]').parent('li').siblings().removeClass('active');
  //       $('.tab-content').hide();
  //       $('#' + current_href).show();
  //       $("html, body").animate({
  //         scrollTop: 430
  //       });
  //     }
  //   }
  // });


  //  TABS FUNCTION CLOSE



  $('.heart-speak-slider').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  $('.heart-speak-slider2').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: true,

  });
  $('section#testimonial .testimonialslider').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,

  });
  

  $('.slidescontainer').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });


/*===============hamburger-js-intialize===================*/


    $('#mobile-nav .parent').append('<span class="open-menu fa fa-plus"></span>');
    
    $('#mobile-nav > ul').wrap('<div class="overflow"></div>');
    $(window).on('load resize', function () {
        var vph = $(window).height() - 57; 
        $('.overflow').css('max-height', vph);
    });

    var menu = $('.overflow > ul');
    var bg = $('html, body');

    function bgScrolling() {

        if (menu.hasClass('open')) {

            bg.css({
                'overflow-y': 'hidden',
                'height': 'auto'
            });

        } else {

            bg.css({
                'overflow-y': 'visible',
                'height': '100%'
            });
        }
    }
    
    $('.menu-button').on('click', function (e) {
        e.preventDefault();
        menu.slideToggle(250);
        menu.toggleClass('open');
        $(this).children().toggleClass('open');
        bgScrolling();
    });
    

    $('.open-menu').on('click', function (e) {
        e.preventDefault();
        $(this).prev('ul').slideToggle(250);
        $(this).toggleClass('rotate');
    });


/*===============hamburger-js-intialize-end===================*/


$('#play-pause-button').on("click",function(){
  if($(this).hasClass('fa-play'))
   {
     $(this).removeClass('fa-play');
     $(this).addClass('fa-pause');
     $('#my-audio')[0].play();
   }
  else
   {
     $(this).removeClass('fa-pause');
     $(this).addClass('fa-play');
     $('#my-audio')[0].pause();
   }
});

$('#my-audio').onended = function() {
     $("#play-pause-button").removeClass('fa-pause');
     $("#play-pause-button").addClass('fa-play');
};


/* read-more-function */
$(document).find('.readmore___content').each(function(){
  var line_height = $(this).css('line-height');
  line_height = parseInt(line_height);
  var para_height = $(this).css('height');
  para_height =  parseInt(para_height);
  var no_of_lines = para_height/line_height;
  if(no_of_lines > 8) {
   var new_height_value = line_height * 8;
   var new_height =  new_height_value + 'px';
    $(this).css('height' , new_height);
  }

  console.log(no_of_lines);

  if(no_of_lines <= 8){
    $(this).next('.expanded_-_button').addClass("hide");
  } else {
    $(this).next('.expanded_-_button').removeClass("hide");
  }
});
  
$('.expanded_-_button').click(function(){
  $('.readmore___content').toggleClass('visible_all');
  var text = $(this).text() == 'READ MORE' ? 'READ MORE' : 'READ LESS';
  $(this).text(text).toggleClass("active");

});

$('section#award-slider .slider').slick({
  infinite: true,
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 8000,
  arrows: true,
  responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});



var readMore = jQuery(document).ready(function () {
  jQuery(".new-events .readmore-content .toggle").click(function () {
      var elem = jQuery(this).text();
      if (elem == "Read More") {
          jQuery(this).text("Read Less");
          jQuery(this).parent().find('.text').slideDown('fast', function() {
            jQuery(this).css('display','inline');
          });
      } else {
          jQuery(this).text("Read More");
          jQuery(this).parent().find('.text').slideUp();
      }
  });

  }); 

/* read-more-function-end */


var selScrollable = '.scrollable';
$(document).on('touchmove',function(e){
  e.preventDefault();
});
$('body').on('touchstart', selScrollable, function(e) {
  if (e.currentTarget.scrollTop === 0) {
    e.currentTarget.scrollTop = 1;
  } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
    e.currentTarget.scrollTop -= 1;
  }
});   
$('body').on('touchmove', selScrollable, function(e) {
  e.stopPropagation();
});
jQuery("#apply-now-form .collapsible-btn").click(function() {
  jQuery("#apply-now-form .qualification-field").slideToggle();
});

$("footer .donate-sticky").hover(function(){
  $("footer .donate-sticky ul").slideToggle();
})
$(".header-nav li.button-donate ").hover(function(){
  $(".header-nav li.button-donate ul").slideToggle();
})

}); // DOCUMENT-READY-CLOSE