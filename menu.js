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
	  pp_nav();
	})


	// INIT

	for (var i=0; i<nbNavItems; i++) {
		$(window).trigger('resize');
	}


	// PRIORITY PATTERN NAV


	function pp_nav() {
		windowW = $(window).width();
		var navW;
		var remainW;
		var availableW;
		var navPad;
		get_data();

		// Hamburger

		if (activeItems < nbNavItems) {
		  $('.hamburger').addClass('is-visible');
		} else {
		  $('.hamburger').removeClass('is-visible pp-visible');
		  $('.pp').removeClass('is-visible');
		}

		// Move items

		if (remainW < navW) {
			if ($('.nav__secondary .nav__item').length > 0) {
			  var $item =  $('.nav__secondary').children().last();
			} else {
			  var $item =  $('.nav__primary').children().last();
			}
			ppItemsW.push($item.outerWidth());
			$item.removeClass('is-active').prependTo('.pp').on('click', clicPPnavItem).off('click', clicNavItem);
			clicPPnavItem();
			activeItems--;
		} else {
			if (ppItemsW.length>0) {
				if (availableW > ppItemsW[ppItemsW.length-1]) {
					var $item = $('.pp .nav__item').first();
					if ($('.nav__primary .nav__item').length == nbNavItemsNav1) {
					  $item.first().appendTo('.nav__secondary');
					} else {
					  $item.first().appendTo('.nav__primary');
					}
					$item.removeClass('is-unfold').off('click', clicPPnavItem).on('click', clicNavItem);
					ppItemsW.pop();
					activeItems++;
				}
			}
		}

		// Get data

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
	}


	// SEARCH

	$('.js-toggle-search').on('click', toggleSearch);
	function toggleSearch() {
		if (!$('.navbar').hasClass('is-search')) {
			setTimeout(function() { $('.nav__search__input').focus(); }, 1);
		}
		$('.navbar').toggleClass('is-search');
	}


	// CLIC EVENTS FOR TOUCH DEVICES

	if ($('body').hasClass('touch')) {
		$('.js-toggle-pp').click(function(){
			clearMenu();
			if (!$('.pp').hasClass('is-visible')) {
				$('.navbar__id').addClass('is-compact');
			}
			$(this).toggleClass('pp-visible');
			$('.pp').toggleClass('is-visible');
		})

		$('.no-pp .nav__item').on('click', clicNavItem);
	}

	function clicNavItem(e) {
		console.log('clic nav');
		if (!$(e.target).hasClass('nav__item__title')) {
			return;
		}
		if ($(this).hasClass('is-active')) {
			clearMenu();
		} else {
			clearMenu();
			$(this).toggleClass('is-active');
			$('.pp').removeClass('is-visible');
			$('.js-toggle-pp').removeClass('pp-visible')
			$('.navbar__id').addClass('is-compact');
		}
	}

	function clicPPnavItem() {
		console.log('clic pp');
	    $('.pp .is-unfold').removeClass('is-unfold');
	    $(this).addClass('is-unfold');
	}

	function clearMenu() {
		$('.no-pp .is-active').removeClass('is-active');
		$('.pp .is-unfold').removeClass('is-unfold');
		if (!$('.navbar').hasClass('stick-top')) {
			$('.navbar__id').removeClass('is-compact');
		}
	}

	// SIMULATION WAYPOINT

	$('.js-toggle').click(function(e){
	  $('.navbar').toggleClass('stick-top');
	  if (!$('.pp').hasClass('is-visible') && $('.no-pp .nav__item.is-active').length == 0) {
	  	console.log($('.no-pp .nav__item.is-active').length);
	  	$('.navbar__id').toggleClass('is-compact');
	  }
	  e.preventDefault();
	})
});