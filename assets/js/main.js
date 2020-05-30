/**
* Template Name: DevFolio - v2.1.1
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function($) {
  "use strict";

  var typed_strings, num_comments, num_letters;

  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbxeCPEHCmjvCoT1ZmpSfCTP3YSri8shXu-DfUHph7InskUIDkgp/exec",
    type: "POST",
    async: false,
    data: JSON.stringify({
      func: 'getData'
    }),
    success: function(result) {
      const data = JSON.parse(result);
      typed_strings = data.comments;
      num_comments = data.numComments;
      num_letters = data.numLetters;
    },
    error:function(error){
      console.log(error);
    }
  });

  var nav = $('nav');
  var navHeight = nav.outerHeight();

  $('.navbar-toggler').on('click', function() {
    if (!$('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  /*--/ Star ScrollTop /--*/
  $('.scrolltop-mf').on("click", function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  });

  /*--/ Star Counter /--*/
  var startDay = new Date(2020, 4, 25); 
  var today = new Date();
  var endDay = new Date(2021, 10, 27); 
  var pastDays = Math.floor((today.getTime() - startDay.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  var restDays = Math.floor((endDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  $('.counter:eq(0)').text(num_comments);
  $('.counter:eq(1)').text(num_letters);
  $('.counter:eq(2)').text(pastDays);
  $('.counter:eq(3)').text(restDays);
  $('.counter').counterUp({
    delay: 15,
    time: 2000
  });

  /*--/ Star Scrolling nav /--*/
  var mainNav_height = $('#mainNav').outerHeight() - 22;
  $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        var scrollto = target.offset().top - mainNav_height;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll').on("click", function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: navHeight
  });
  /*--/ End Scrolling nav /--*/

  /*--/ Navbar Menu Reduce /--*/
  $(window).trigger('scroll');
  $(window).on('scroll', function() {
    var pixels = 50;
    var top = 1200;
    if ($(window).scrollTop() > pixels) {
      $('.navbar-expand-md').addClass('navbar-reduce');
      $('.navbar-expand-md').removeClass('navbar-trans');
    } else {
      if (!$('#navbarDefault').hasClass('show')) {
        $('.navbar-expand-md').removeClass('navbar-reduce');
      }
      $('.navbar-expand-md').addClass('navbar-trans');
    }
    if ($(window).scrollTop() > top) {
      $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
    } else {
      $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
    }
  });

  /*--/ Star Typed /--*/
  if ($('.text-slider').length == 1) {
    var typed = new Typed('.text-slider', {
      strings: typed_strings.split(','),
      typeSpeed: 80,
      loop: true,
      backDelay: 1100,
      backSpeed: 30
    });
  }

  /*--/ Comment Submit /--*/
  $('#intro-comment-button').click(function(){
    $('#intro-comment-button').attr('disabled', true);
    $('#intro-comment-button').html('<i class="fa fa-spinner loadingicon"></i>');
    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbxeCPEHCmjvCoT1ZmpSfCTP3YSri8shXu-DfUHph7InskUIDkgp/exec",
      type: "POST",
      data: JSON.stringify({
        func: 'setComment',
        comment: $('#intro-comment-input').val()
      }),
      success: function(result) {
        window.location.reload();
      },
      error:function(error){
        console.log(error);
        $('#intro-comment-button').attr('disabled', false);
      }
    });
  });

  /*--/ Testimonials owl /--*/
  $('#testimonial-mf').owlCarousel({
    margin: 20,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      }
    }
  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox({
      'share': false
    });
  });
  
  // Instagram redirect

  function getMobileOS() {
    var OSName="Unknown OS";
    if (navigator.platform.indexOf("Linux")!=-1) OSName="Linux";
    if (navigator.platform.indexOf("iPhone")!=-1) OSName="iOS";
    if (navigator.platform.indexOf("Android")!=-1) OSName="Android";

    return OSName;
  }

  function redirect() {
    event.preventDefault();
    var os = getMobileOS();
    console.log(os);
    if (os === "iOS") {
      console.log("correct");
      document.location.href = "instagram://user?username=taehyeon.an";
    } else if (os === "Android") {
      document.location.href = "intent://instagram.com/_u/taehyeon.an/#Intent;package=com.instagram.android;scheme=https;end";
    } else {
      document.location.href = "https://instagram.com/_u/taehyeon.an/";
    }
  }

  $('#icon-instagram').click(function(){
    redirect();
  });

})(jQuery);