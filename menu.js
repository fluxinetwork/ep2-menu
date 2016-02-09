$(document).ready(function(){

	// Jquery OuterWidth() always with margin & padding

	var oldOuterWidth = $.fn.outerWidth;
	$.fn.outerWidth = function () { 
	    return oldOuterWidth.apply(this, [true]);
	};

	// VARS

	var windowW;
	var navW;
	var ppItemsW = new Array();

	var navPad;
	var logoW = $('.navbar__id').outerWidth();
	var buttonsW = $('.navbar__buttons').outerWidth();
	var nbNavItems = $('.nav__item').length;
	var activeItems = nbNavItems;
	var nbNavItemsNav1 = $('.nav__primary .nav__item').length;
	var nbNavItemsNav2 = $('.nav__secondary .nav__item').length;


	// INIT

	monitor_nav();
	monitor_nav();


	// RESIZE

	$(window).on('resize', function() {
	  monitor_nav();
	})


	// MONITOR NAV


	function monitor_nav() {
		windowW = $(window).width();
		var remainW;
		var availableW;
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
			$item.prependTo('.pp').addClass('js-init');
			activePPitem();
			activeItems--;
		} else {
			if (ppItemsW.length>0) {
				if (availableW > ppItemsW[ppItemsW.length-1]) {
					if ($('.nav__primary .nav__item').length == nbNavItemsNav1) {
					  $('.pp .nav__item').first().appendTo('.nav__secondary');
					} else {
					  $('.pp .nav__item').first().appendTo('.nav__primary');
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

	$('.js-toggle-pp').click(function(){
	  $('.pp').toggleClass('is-visible');
	})

	$('.js-toggle').click(function(e){
	  $('.navbar').toggleClass('is-compact');
	  $('.navbar__id').toggleClass('is-compact');
	  e.preventDefault();
	})
});