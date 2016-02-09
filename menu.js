$(document).ready(function(){

	// Jquery OuterWidth() always with margin & padding

	var oldOuterWidth = $.fn.outerWidth;
	$.fn.outerWidth = function () { 
	    return oldOuterWidth.apply(this, [true]);
	};

	// VARS

	var windowW;
	var ppItemsW = new Array();

	var logoW = $('.navbar__id').outerWidth();
	var buttonsW = $('.navbar__buttons').outerWidth();
	var nbNavItems = $('.nav__item').length;
	var activeItems = nbNavItems;
	var nbNavItemsNav1 = $('.nav__primary .nav__item').length;
	var nbNavItemsNav2 = $('.nav__secondary .nav__item').length;


	// RESIZE

	$(window).on('resize', function() {
	  monitor_nav();
	})


	// INIT

	for (var i=0; i<nbNavItems; i++) {
		$(window).trigger('resize');
	}


	// MONITOR NAV


	function monitor_nav() {
		windowW = $(window).width();
		var navW;
		var remainW;
		var availableW;
		var navPad;
		get_data();

		// Hamburger

		if (activeItems < nbNavItems) {
		  $('.hamburger').addClass('is-visible')
		} else {
		  $('.hamburger').removeClass('is-visible')
		}

		// Move items

		if (remainW < navW) {
			if ($('.nav__secondary .nav__item').length > 0) {
			  var $item =  $('.nav__secondary').children().last();
			} else {
			  var $item =  $('.nav__primary').children().last();
			}
			ppItemsW.push($item.outerWidth());
			$item.prependTo('.pp').addClass('js-init').removeClass('is-active');
			activePPitem();
			activeItems--;
		} else {
			if (ppItemsW.length>0) {
				if (availableW > ppItemsW[ppItemsW.length-1]) {
					var $item = $('.pp .nav__item').first().removeClass('is-unfold');
					if ($('.nav__primary .nav__item').length == nbNavItemsNav1) {
					var $item = 
					  $item.first().appendTo('.nav__secondary');
					} else {
					  $item.first().appendTo('.nav__primary');
					}
					ppItemsW.pop();
					activeItems++;
				}
			}
		}

		// Utils

		function get_data() {
			var hamburgerW = 0;
			if ($('.hamburger').hasClass('is-visible')) {
				hamburgerW = 50;
			}
			navW = $('.nav__primary').innerWidth() + $('.nav__secondary').width();
			navbarPd = $('.navbar').css('padding-left').replace("px", "")*2;
			remainW = windowW - logoW - buttonsW - navbarPd - hamburgerW;
			availableW = remainW - navW;
		}

		function activePPitem() {
		  $('.pp .js-init').on('click', function() {
		    $('.pp .is-unfold').toggleClass('is-unfold');
		    $(this).toggleClass('is-unfold');
		  }).removeClass('js-init');
		}
	}


	// TOGGLE

	if ($('body').hasClass('touch')) {
		$('.js-toggle-pp').click(function(){
			clearMenu();
			if (!$('.pp').hasClass('is-visible')) {
				$('.navbar__id').addClass('is-compact');
			}
			$(this).toggleClass('pp-visible');
			$('.pp').toggleClass('is-visible');
		})

		$('.no-pp .nav__item').click(function(){
			if ($(this).hasClass('is-active')) {
				clearMenu();
			} else {
				clearMenu();
				$(this).toggleClass('is-active');
				$('.pp').removeClass('is-visible');
				$('.js-toggle-pp').removeClass('pp-visible')
				$('.navbar__id').addClass('is-compact');
			}
		})

		function clearMenu() {
			$('.no-pp .is-active').removeClass('is-active');
			$('.pp .is-unfold').removeClass('is-unfold');
			if (!$('.navbar').hasClass('stick-top')) {
				$('.navbar__id').removeClass('is-compact');
			}
		}
	}

	$('.js-toggle').click(function(e){
	  $('.navbar').toggleClass('stick-top');
	  if (!$('.pp').hasClass('is-visible') && $('.no-pp .nav__item.is-active').length == 0) {
	  	console.log($('.no-pp .nav__item.is-active').length);
	  	$('.navbar__id').toggleClass('is-compact');
	  }
	  e.preventDefault();
	})
});