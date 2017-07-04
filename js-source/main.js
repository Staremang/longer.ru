/*
 * jQuery Dropdown: A simple dropdown plugin
 *
 * Contribute: https://github.com/claviska/jquery-dropdown
 *
 * @license: MIT license: http://opensource.org/licenses/MIT
 *
 */
if (jQuery) (function ($) {

    $.extend($.fn, {
        jqDropdown: function (method, data) {

            switch (method) {
                case 'show':
                    show(null, $(this));
                    return $(this);
                case 'hide':
                    hide();
                    return $(this);
                case 'attach':
                    return $(this).attr('data-jq-dropdown', data);
                case 'detach':
                    hide();
                    return $(this).removeAttr('data-jq-dropdown');
                case 'disable':
                    return $(this).addClass('jq-dropdown-disabled');
                case 'enable':
                    hide();
                    return $(this).removeClass('jq-dropdown-disabled');
            }

        }
    });

    function show(event, object) {

        var trigger = event ? $(this) : object,
            jqDropdown = $(trigger.attr('data-jq-dropdown')),
            isOpen = trigger.hasClass('jq-dropdown-open');

        // In some cases we don't want to show it
        if (event) {
            if ($(event.target).hasClass('jq-dropdown-ignore')) return;

            event.preventDefault();
            event.stopPropagation();
        } else {
            if (trigger !== object.target && $(object.target).hasClass('jq-dropdown-ignore')) return;
        }
        hide();

        if (isOpen || trigger.hasClass('jq-dropdown-disabled')) return;

        // Show it
        trigger.addClass('jq-dropdown-open');
        jqDropdown
            .data('jq-dropdown-trigger', trigger)
            .show();

        // Position it
        position();

        // Trigger the show callback
        jqDropdown
            .trigger('show', {
                jqDropdown: jqDropdown,
                trigger: trigger
            });

    }

    function hide(event) {

        // In some cases we don't hide them
        var targetGroup = event ? $(event.target).parents().addBack() : null;

        // Are we clicking anywhere in a jq-dropdown?
        if (targetGroup && targetGroup.is('.jq-dropdown')) {
            // Is it a jq-dropdown menu?
            if (targetGroup.is('.jq-dropdown-menu')) {
                // Did we click on an option? If so close it.
                if (!targetGroup.is('A')) return;
            } else {
                // Nope, it's a panel. Leave it open.
                return;
            }
        }

        // Trigger the event early, so that it might be prevented on the visible popups
        var hideEvent = jQuery.Event("hide");

        $(document).find('.jq-dropdown:visible').each(function () {
            var jqDropdown = $(this);
            jqDropdown
                .hide()
                .removeData('jq-dropdown-trigger')
                .trigger('hide', { jqDropdown: jqDropdown });
        });

        if(!hideEvent.isDefaultPrevented()) {
            // Hide any jq-dropdown that may be showing
            $(document).find('.jq-dropdown:visible').each(function () {
                var jqDropdown = $(this);
                jqDropdown
                    .hide()
                    .removeData('jq-dropdown-trigger')
                    .trigger('hide', { jqDropdown: jqDropdown });
            });

            // Remove all jq-dropdown-open classes
            $(document).find('.jq-dropdown-open').removeClass('jq-dropdown-open');
        }
    }

    function position() {

        var jqDropdown = $('.jq-dropdown:visible').eq(0),
            trigger = jqDropdown.data('jq-dropdown-trigger'),
            hOffset = trigger ? parseInt(trigger.attr('data-horizontal-offset') || 0, 10) : null,
            vOffset = trigger ? parseInt(trigger.attr('data-vertical-offset') || 0, 10) : null;

        if (jqDropdown.length === 0 || !trigger) return;

        // Position the jq-dropdown relative-to-parent...
        if (jqDropdown.hasClass('jq-dropdown-relative')) {
            jqDropdown.css({
                left: jqDropdown.hasClass('jq-dropdown-anchor-right') ?
                    trigger.position().left - (jqDropdown.outerWidth(true) - trigger.outerWidth(true)) - parseInt(trigger.css('margin-right'), 10) + hOffset :
                    trigger.position().left + parseInt(trigger.css('margin-left'), 10) + hOffset,
                top: trigger.position().top + trigger.outerHeight(true) - parseInt(trigger.css('margin-top'), 10) + vOffset
            });
        } else {
            // ...or relative to document
            jqDropdown.css({
                left: jqDropdown.hasClass('jq-dropdown-anchor-right') ?
                    trigger.offset().left - (jqDropdown.outerWidth() - trigger.outerWidth()) + hOffset : trigger.offset().left + hOffset,
                top: trigger.offset().top + trigger.outerHeight() + vOffset
            });
        }
    }

    $(document).on('click.jq-dropdown', '[data-jq-dropdown]', show);
    $(document).on('click.jq-dropdown', hide);
    $(window).on('resize', position);

})(jQuery);
if (typeof(ymaps) !== "undefined") {
	ymaps.ready(init);
	var yaMap;
	function init() {
		ymaps.geocode(addr, {
			results: 1
		}).then(function (res) {

			var coords = res.geoObjects.get(0).geometry.getCoordinates(),
				myPlacemark = new ymaps.Placemark(coords);
			yaMap = new ymaps.Map("map",{
				center: coords,
				zoom: 15,
				controls: ['zoomControl', 'fullscreenControl']
			});

			yaMap.geoObjects.add(myPlacemark);
		});
	}
}

$(document).ready(function () {
//	console.log('sdf');
//	var homeSlider = $('.home-slider');
//	homeSlider.owlCarousel({
//		loop:true,
//		nav:true,
//		navText: [ '<img src="img/arrow-left.png" alt="Влево">', '<img src="img/arrow-right.png" alt="Вправо">' ],
//		items:1
//	//			autoplay:true,
//	//			autoplayTimeout:5000,
//	//			autoplayHoverPause:true
//	})

	$('.slider-hero').owlCarousel({
		loop:false,
		nav:true,
		navText: [ '<img src="img/arrow-left.svg" alt="Влево">', '<img src="img/arrow-right.svg" alt="Вправо">' ],
		items:1,
    animateOut: 'fadeOut',
		mouseDrag: false
//    animateIn: 'flipInX',
	//			autoplay:true,
	//			autoplayTimeout:5000,
	//			autoplayHoverPause:true
	})

	//		$('.product-info__item').hide();
	//		$('.product-info__item').eq(0).show();
//	$('.home-slider-info__item').hide();
//	$('.home-slider-info__item').eq(0).show();
//	homeSlider.on('changed.owl.carousel initialized.owl.carousel', function(event) {
//		var owlItems  = event.item.count,
//			item      = event.item.index,
//			calcItem  = Math.floor(item - (event.item.count / 2) + 1);
//
//		if (calcItem === 0) {
//			calcItem = owlItems;
//		}
//		if (calcItem > owlItems) {
//			calcItem = 1;
//		}
//		$('.home-slider-info__item').hide();
//		$('.home-slider-info__item').eq(calcItem - 1).toggle();
//	});
//	$('.news-slider').owlCarousel({
//		loop: true,
//		nav: false,
//		navText: [ '', '' ],
//		items: 6,
//		slideBy: 6,
//		margin: 12,
////		autoplay: true,
////		autoplayTimeout: 5000,
////		autoplayHoverPause: true
//	})
//	$('.recipe-slider').owlCarousel({
//		loop: true,
//		nav: false,
//		navText: [ '', '' ],
//		items: 2,
//		slideBy: 2,
//		margin: 20,
//		autoplay: true,
//		autoplayTimeout: 5000,
//		autoplayHoverPause: true
//	})
//	$('.slider-btn-right').click(function() {
//		$('.' + $(this).attr('data-for')).trigger('next.owl.carousel');
//	})
//	$('.slider-btn-left').click(function() {
//		$('.' + $(this).attr('data-for')).trigger('prev.owl.carousel');
//	})
//
//
//
//
//
//	$('.product__item').hide();
//	if (window.location.hash && $('.product__item' + window.location.hash).length) {
//		$(window.location.hash).show();
//		$('.products-menu__item[href="' + window.location.hash + '"]').addClass('active');
//	} else {
//		$('.product__item').eq(0).show();
//		$('.products-menu__item').eq(0).addClass('active');
//	}
//	$('.products-menu__item').click(function(e) {
//		window.location.hash = $(this).attr('href');
//		e.preventDefault();
//		$('.products-menu__item').removeClass('active');
//		$(this).addClass('active');
//		$('.product__item').hide();
//		$($(this).attr('href')).show();
//	})
})