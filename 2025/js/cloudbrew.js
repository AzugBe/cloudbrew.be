(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
		location.hash = $(this).attr('href').slice(1);
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 600, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Floating label headings for the contact form
  $(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });
  
  // History and deep linking for sessions
  var szRestoreHistory = function() {
    if (location.hash.indexOf('#session-') == 0) {
	  $('.sz-session__title a').each(function() {
        if (location.hash == '#' + szSlugify('session-' + $(this).text())) {
          $(this).click();
        }
	  });
	} else if (location.hash.indexOf('#speaker-') == 0) {
	  $('.sz-speaker__name a').each(function() {
        if (location.hash == '#' + szSlugify('speaker-' + $(this).text())) {
          $(this).click();
        }
	  });
	}
  };
  var szSlugify = function(subject) {
	return subject.toLowerCase().replace(/\W/g, "-").replace(/--/g, "-");
  };
  var szPushHistory = function(subject) {
	location.hash = szSlugify(subject);
  };
  window.onpopstate = function() {
    $('.sz-modal__close-on-click').last().click();
    setTimeout(szRestoreHistory, 500);
  }

  //$(document).on('click', '.sz-modal__close-on-click', function() {
  //});
  $(document).on('click', '.sz-session__title a', function() {
	szPushHistory('session-' + $(this).text());
  }); 
  $(document).on('click', 'ul.sz-speaker__sessions li a', function() {
	szPushHistory('session-' + $(this).text());
  });  
  $(document).on('click', '.sz-speaker__name a', function() {
	szPushHistory('speaker-' + $(this).text());
  });
  $(document).on('click', 'ul.sz-session__speakers li a', function() {
	szPushHistory('speaker-' + $(this).text());
  });
  
  if (location.hash.length > 1) {
    setTimeout(szRestoreHistory, 1000);
  }

})(jQuery); // End of use strict
